import React, { useState } from 'react';
import axios from "axios"
const CreateRule = () => {
    const [ruleString, setRuleString] = useState('');
    const [ruleName, setRuleName] = useState('');
    const [message, setMessage] = useState('');

    const createRule = async () => {
        try {
            // Make a POST request using axios
            const response = await axios.post("http://localhost:3000/api/rules/create", {
                ruleName,
                ruleString
            }, {
                headers: { 'Content-Type': 'application/json' } // Correctly set headers
            });
    
            console.log(response); // Log the entire response
    
            // Check if response is successful
            if (response.status !== 200) { // Check for a successful status
                const errorMessage = response.data?.error || 'Unknown error'; // Get the error message if available
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorMessage}`);
            }
    
            const data = response.data; // Use response.data directly
            setMessage(`Rule created`);
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };
    

    return (
        <div className='bg-white p-6 rounded-lg shadow-lg'>
            <h2 className='text-2xl font-semibold mb-4'>Create Rule</h2>
            <input
                className='w-full p-2 mb-4 border border-gray-300 rounded-lg'
                type='text'
                value={ruleName}
                onChange={(e) => setRuleName(e.target.value)}
                placeholder='Rule Name'
            />
            <input
                className='w-full p-2 mb-4 border border-gray-300 rounded-lg'
                type='text'
                value={ruleString}
                onChange={(e) => setRuleString(e.target.value)}
                placeholder='Rule String'
            />
            <button className='bg-blue-500 text-white px-4 py-2 rounded-lg' onClick={createRule}>Create Rule</button>
            <div className='mt-4 text-green-500'>{message}</div>
        </div>
    );
};

export default CreateRule;