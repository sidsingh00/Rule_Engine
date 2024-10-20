// src/components/GetAllRules.jsx
import React, { useEffect, useState } from 'react';
import { getAllRules } from '../utils/api';

const GetAllRules = () => {
  const [rules, setRules] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const result = await getAllRules();
        setRules(result);
        setError(null);
      } catch (error) {
        setError('Error fetching rules');
      }
    };

    fetchRules();
  }, []);

  if (error) return <div className='text-red-500'>Error: {error}</div>;
  if (rules.length === 0) return <div className='text-gray-500'>No rules found</div>;

  return (
    <div className='flex flex-col justify-center items-center p-6'>
      <h2 className='text-4xl font-bold mb-8 text-center text-blue-600'>All Rules</h2>
      <div className='w-full max-w-4xl bg-white shadow-md rounded-lg overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-blue-500 text-white'>
            <tr>
              <th className='p-4 text-left text-sm font-medium'>Rule ID</th>
              <th className='p-4 text-left text-sm font-medium'>Rule String</th>
            </tr>
          </thead>
          <tbody className='bg-gray-50 divide-y divide-gray-200'>
            {rules.map((rule) => (
              <tr key={rule._id} className='hover:bg-gray-100'>
                <td className='p-4 text-sm'>{rule._id}</td>
                <td className='p-4 text-sm'>{rule.ruleString}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetAllRules;
