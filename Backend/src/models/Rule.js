const mongoose = require('mongoose');

const ruleSchema = new mongoose.Schema({
    ruleString: String,
    ast: Object
});

module.exports = mongoose.model('Rule', ruleSchema);