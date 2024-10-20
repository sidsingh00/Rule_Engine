const express = require('express');
const bodyParser = require('body-parser');
const ruleRoutes = require('./routes/rules');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; // Fallback to port 3000 if PORT is not set

app.use(express.json());
app.use(cookieParser());
app.use(cors());

require('./config/db');

// Routes
app.use('/api/rules', ruleRoutes);

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


function evaluateRule(rule, data) {
    const { age, department, salary, experience } = data;
    // Ensure the rule string uses proper JavaScript syntax
    const condition = rule.replace(/AND/g, '&&').replace(/OR/g, '||');
    return eval(condition);
  }
  
  app.post('/api/rules/evaluate', (req, res) => {
    const { ruleId, data } = req.body;
    // Here, ruleId is actually the rule string
    const result = evaluateRule(ruleId, data);
    res.json({ result });
  });
  
// Handle server errors
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please use a different port.`);
    } else {
        console.error(`Server error: ${err}`);
    }
});