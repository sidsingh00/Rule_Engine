const express = require('express');
const router = express.Router();
const ruleController = require('../controllers/ruleController');

router.post('/', ruleController.createRule);
router.post('/combine', ruleController.combineRules);
router.post('/evaluate', ruleController.evaluateRule);
router.put('/modify', ruleController.modifyRule);
router.get('/all', ruleController.getAllRules);
  
module.exports = router;