const Node = require('../utils/ast');
const Rule = require('../models/Rule');

const validAttributes = ['age', 'department', 'salary', 'experience'];

const evaluateNode = (node, data) => {
    if (node.type === 'operator') {
        const leftValue = evaluateNode(node.left, data);
        const rightValue = evaluateNode(node.right, data);

        if (node.value === 'AND') {
            return leftValue && rightValue;
        } else if (node.value === 'OR') {
            return leftValue || rightValue;
        }
    } else if (node.type === 'operand') {
        const { attribute, operator, value } = node.value;
        const dataValue = data[attribute];
        const cleanValue = typeof value === 'string' && value.startsWith("'") && value.endsWith("'")
            ? value.slice(1, -1)
            : value;

        switch (operator) {
            case '>':
                return dataValue > cleanValue;
            case '<':
                return dataValue < cleanValue;
            case '>=':
                return dataValue >= cleanValue;
            case '<=':
                return dataValue <= cleanValue;
            case '=':
                return dataValue == cleanValue;
            default:
                return false;
        }
    }

    return false;
};

// Function to parse rule string into AST
const parseRuleString = (ruleString) => {
    console.log('Parsing rule string:', ruleString);
    const tokens = ruleString.match(/(?:[^\s()]+|\(|\))/g);
    if (!tokens) throw new Error('Invalid rule string');

    const outputQueue = [];
    const operatorStack = [];
    const operators = ['AND', 'OR'];
    const precedence = { 'AND': 1, 'OR': 0 };

    tokens.forEach(token => {
        if (operators.includes(token)) {
            while (operatorStack.length && operators.includes(operatorStack[operatorStack.length - 1]) && precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]) {
                outputQueue.push(operatorStack.pop());
            }
            operatorStack.push(token);
        } else if (token === '(') {
            operatorStack.push(token);
        } else if (token === ')') {
            while (operatorStack.length && operatorStack[operatorStack.length - 1] !== '(') {
                outputQueue.push(operatorStack.pop());
            }
            operatorStack.pop();
        } else {
            outputQueue.push(token);
        }
    });

    while (operatorStack.length) {
        outputQueue.push(operatorStack.pop());
    }

    const stack = [];

    const createOperandNode = (tokens) => {
        const [attribute, operator, value] = tokens;
        if (!attribute || !operator || !value) throw new Error('Invalid rule string');
        return new Node('operand', null, null, { attribute, operator, value });
    };

    for (let i = 0; i < outputQueue.length; i++) {
        const token = outputQueue[i];
        if (operators.includes(token)) {
            const right = stack.pop();
            const left = stack.pop();
            if (!right || !left) throw new Error('Invalid rule string');
            stack.push(new Node('operator', left, right, token));
        } else if (['>', '<', '>=', '<=', '='].includes(token)) {
            // The next token should be a value
            const value = outputQueue[++i];
            const attribute = stack.pop();
            stack.push(new Node('operand', null, null, { attribute, operator: token, value }));
        } else {
            stack.push(token);
        }
    }

    if (stack.length !== 1) throw new Error('Invalid rule string');

    return stack[0];
};

exports.createRule = async (req, res) => {
    try {
        const { rule_string: ruleString } = req.body;
        console.log('Received rule string:', ruleString);
        const ast = parseRuleString(ruleString);
        const newRule = new Rule({ ruleString, ast });
        await newRule.save();
        res.status(201).json(newRule);
    } catch (error) {
        console.error('Error:', error.message); // Log the error for debugging
        res.status(400).json({ error: 'Invalid rule string' });
    }
};

exports.combineRules = async (req, res) => {
    try {
        const { ruleStrings } = req.body;
        const parsedRules = ruleStrings.map(parseRuleString);

        let combinedAST = parsedRules[0];
        for (let i = 1; i < parsedRules.length; i++) {
            combinedAST = new Node('operator', combinedAST, parsedRules[i], 'AND');
        }

        res.json({ combinedAST });
    } catch (error) {
        res.status(400).json({ error: 'Error combining rules' });
    }
};


exports.evaluateRule = async (req, res) => {
    try {
        console.log("evaluating")
        const { ruleId, data } = req.body;
        const rule = await Rule.findOne({ _id: ruleId });
        console.log("Rule fetched from DB: ", JSON.stringify(rule, null, 2)); // Print rule and AST
        if (!rule) {
            return res.status(404).json({ error: 'Rule not found' });
        }

        const result = evaluateNode(rule.ast, data);
        res.json({ result });
    } catch (error) {
        res.status(400).json({ error: 'Invalid data format' });
    }
};
exports.modifyRule = async (req, res) => {
    try {
        const { ruleId, newRuleString } = req.body;
        const newAST = parseRuleString(newRuleString);
        const rule = await Rule.findById(ruleId);
        if (!rule) {
            return res.status(404).json({ error: 'Rule not found' });
        }

        rule.ruleString = newRuleString;
        rule.ast = newAST;
        await rule.save();
        res.json(rule);
    } catch (error) {
        res.status(400).json({ error: 'Invalid rule string or rule not found' });
    }
};
// Method to get all rules
exports.getAllRules = async (req, res) => {
    try {
        const rules = await Rule.find();
        res.status(200).json(rules);
    } catch (error) {
        console.error('Error fetching rules:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
};

