// src/components/DisplayRules.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DisplayRules = () => {
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/rules/all');
        console.log('Fetched rules:', response.data);
        setRules(response.data);
      } catch (error) {
        console.error('Error fetching rules:', error.response ? error.response.data : error.message); // Improved error logging
        setError('Failed to fetch rules');
      } finally {
        setLoading(false);
      }
    };
    fetchRules();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className='text-red-500'>{error}</p>;

  return (
    <div className='flex flex-col space-y-10 justify-center items-center h-full'>
      <h2 className='text-5xl font-bold mt-20'>Display Rules</h2>
      
      <ul className='bg-violet-600 text-white space-y-6 p-10'>
        {rules?.length > 0 ? (
          rules?.map((rule) => (
            <li key={rule?._id} className='p-4 border border-gray-300 rounded-md'>
              <pre>{rule?.ruleString}</pre>
            </li>
          ))
        ) : (
          <li className='p-4 text-center text-gray-500'>No rules available</li>
        )}
      </ul>
    </div>
  );
};

export default DisplayRules;
