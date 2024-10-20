# Rule_Engine
# Rule Engine with Abstract Syntax Tree (AST)

## Objective
Develop a three-tier rule engine application with a user interface (UI), API, and backend to determine user eligibility based on attributes such as age, department, income, and spending. The system uses an Abstract Syntax Tree (AST) for dynamic rule creation and modification.

## Data Structure
Define a `Node` to represent the AST:
- **`type`**: Node type (e.g., "operator" for AND/OR, "operand" for conditions).
- **`left`**: Reference to the left child node.
- **`right`**: Reference to the right child node for operators.
- **`value`**: Optional numerical value for operand nodes.

## Data Storage
Use MongoDB for storing rules and metadata.

### Example Rules
1. `rule1`: `((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)`
2. `rule2`: `((age > 30 AND department = 'Marketing')) AND (salary > 20000 OR experience > 5)`

## API Design
- **`create_rule(rule_string)`**: Generates a Node object from a rule string.
- **`combine_rules(rules)`**: Combines multiple rule strings into a single AST.
- **`evaluate_rule(data)`**: Evaluates the AST against user data.

## Project Structure

### Backend (Node.js)
- **Directory: `rule-engine`**
  - `src/`: Contains configuration, controllers, models, routes, utilities, and `index.js`.
  - `.env`: Environment variables.
  - `package.json`: Project dependencies and scripts.

### Frontend (React, Vite, Tailwind CSS)
- **Directory: `rule-engine-frontend`**
  - `src/`: Contains the main entry point and other frontend files.
  - `.gitignore`, `index.html`, and various config files.

## Setup Instructions

### Clone the Repository
```sh
git clone <repository_url>
cd <repository_directory>
