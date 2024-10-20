import React, { useState } from 'react';
import { createRule } from '../utils/api';

const CreateRule = () => {
  const [ruleString, setRuleString] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleCreateRule = async (e) => {
    e.preventDefault();
    try {
      const result = await createRule(ruleString);
      console.log(result);
      setResponse(result);
      setError(null);
    } catch (error) {
      setError('Error creating rule');
      setResponse(null);
    }
  };

  return (
    <div className="flex flex-col space-y-6 max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">Create Rule</h2>

      <form onSubmit={handleCreateRule} className="flex flex-col space-y-4">
        <div className="flex flex-col">
          <label className="mb-2 text-lg font-semibold text-gray-700">Rule String</label>
          <textarea
            className="p-4 border border-gray-300 rounded-md h-40 resize-none focus:ring-2 focus:ring-green-500"
            value={ruleString}
            onChange={(e) => setRuleString(e.target.value)}
            placeholder="Enter rule string"
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white p-4 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-transform transform hover:scale-105"
        >
          Create Rule
        </button>
      </form>

      {response && (
        <div className='bg-green-100 text-green-800 p-4 rounded-md font-semibold border border-green-200 mt-4'>
       
          {response.ruleString ? (
            <div>Rule created successfully</div>
          ) : (
            <div>Rule not created</div>
          )}
        </div>
      )}

      {error && (
        <div className="text-red-500 mt-4 text-center text-lg">
          Error: {error}
        </div>
      )}
    </div>
  );
};

export default CreateRule;