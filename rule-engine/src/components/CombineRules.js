import React, { useState } from 'react';
import axios from 'axios';
const CombineRules = () => {
  const [ruleIds, setRuleIds] = useState('');
  const [message, setMessage] = useState('');

  
  const combineRules = async () => {
    try {
        // Split and trim the rule IDs from input
        const idsArray = ruleIds.split(',').map(id => id.trim());
     
        // Check if idsArray is not empty
        if (idsArray.length === 0) {
            throw new Error('No rule IDs provided.');
        }

        // Make a POST request using axios
        const response = await axios.post("http://localhost:3000/api/rules/combine", {
            ruleIds: idsArray // Use idsArray here
        }, {
            headers: { 'Content-Type': 'application/json' }
        });

         console.log(response.data);
        // Axios automatically checks the response for success based on the status code
        const data = response.data; // Get data directly from response
        setMessage(`Combined AST: ${JSON.stringify(data)}`);
    } catch (error) {
        // Axios errors have response, request, and message properties
        const errorMessage = error.response?.data?.message || error.message; // Get a detailed error message if available
        setMessage(`Error: ${errorMessage}`);
    }
};


  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Combine Rules</h2>
      <input
        className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
        type="text"
        value={ruleIds}
        onChange={(e) => setRuleIds(e.target.value)}
        placeholder="Enter Rule IDs (comma-separated)"
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        onClick={combineRules}
      >
        Combine Rules
      </button>
      <div className="mt-4 text-green-500">{message}</div>
    </div>
  );
};

export default CombineRules;
