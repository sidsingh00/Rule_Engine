import React, { useState, useEffect } from 'react';
import { evaluateRule } from '../utils/api';

const EvaluateRule = () => {
  const [ruleId, setRuleId] = useState('');
  const [age, setAge] = useState('');
  const [salary, setSalary] = useState('');
  const [department, setDepartment] = useState('');
  const [experience, setExperience] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [ruleIds, setRuleIds] = useState([]);
  const [rule, setRule] = useState('');

  useEffect(() => {
    const getRuleIds = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/rules/all');
        console.log(response);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log('Fetched rule IDs:', result);
        setRuleIds(result);
      } catch (error) {
        console.error('Error fetching rule IDs:', error);
        setError('Error fetching rule IDs');
      }
    };

    getRuleIds();
  }, []);

  console.log(ruleIds);

  const handleEvaluateRule = async (e) => {
    e.preventDefault();
    try {
      const data = {
        age: parseInt(age, 10),
        salary: parseInt(salary, 10),
        department: department,
        experience: parseInt(experience, 10),
      };
      console.log('Sending request body:', { ruleId: rule, data });
      const result = await evaluateRule(rule, data);
      console.log('Received response:', result);
      setResponse(result);
      setError(null);
    } catch (error) {
      console.error('Error evaluating rule:', error);
      setError('Error evaluating rule');
      setResponse(null);
    }
  };



  return (
    <div className="flex flex-col space-y-4 max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Evaluate Rule</h2>

      <form onSubmit={handleEvaluateRule} className="flex flex-col space-y-4">
        <div className="flex flex-col">
          <label className="mb-1 text-lg font-semibold text-gray-700">Rule ID</label>
          <select
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            value={rule}
            onChange={(e) => setRule(e.target.value)}
          >
            <option value="" disabled>Select a Rule ID</option>
            {ruleIds?.map((item) => (
              <option key={item._id} value={item._id}>{item.ruleString}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-lg font-semibold text-gray-700">Age</label>
          <input
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter age"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-lg font-semibold text-gray-700">Department</label>
          <input
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="Enter department"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-lg font-semibold text-gray-700">Salary</label>
          <input
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            placeholder="Enter salary"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-lg font-semibold text-gray-700">Experience</label>
          <input
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            type="number"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            placeholder="Enter experience"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-3 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
        >
          Evaluate Rule
        </button>
      </form>

      {response && (
        <pre className='bg-green-100 text-green-800 p-4 rounded-md font-semibold border border-green-200 mt-4'>
        <div>
      {response.result === true ? (
        <div>You are Eligible</div>
      ) : (
        <div>You are not eligible</div>
      )}
    </div>

        </pre>
      )}
    


      {error && <div className="text-red-500 mt-4 text-center text-lg">Error: {error}</div>}
    </div>
  );
};

export default EvaluateRule;