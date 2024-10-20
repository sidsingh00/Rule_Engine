// src/utils/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Update with your backend URL

export const createRule = async (ruleString) => {
  try {
    const response = await axios.post(`${API_URL}/rules`, { rule_string: ruleString });
    return response.data;
  } catch (error) {
    console.error('API call error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const combineRules = async (ruleStrings) => {
  try {
    const response = await axios.post(`${API_URL}/rules/combine`, { ruleStrings });
    return response.data;
  } catch (error) {
    console.error('API call error:', error.response ? error.response.data : error.message);
    throw error;
  }
};


export const evaluateRule = async (ruleId, data) => {
  try {
    const response = await axios.post(`${API_URL}/rules/evaluate`, { ruleId, data });
    return response.data;
  } catch (error) {
    console.error('API call error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const modifyRule = async (ruleId, newRuleString) => {
  try {
    const response = await axios.put(`${API_URL}/rules/modify`, { ruleId, newRuleString });
    return response.data;
  } catch (error) {
    console.error('API call error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getAllRules = async () => {
  try {
    const response = await axios.get(`${API_URL}/rules/all`);
    return response.data;
  } catch (error) {
    console.error('API call error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

