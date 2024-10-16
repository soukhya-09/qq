// Helper function to parse a rule string and build the AST
exports.createAST = (ruleString) => {
    try {
       
        const tokens = ruleString.match(/\(|\)|AND|OR|>|<|=|'[^']*'|\S+/g);
        if (!tokens) throw new Error("No tokens found in the rule string");
        
        let index = 0;

        function parseExpression() {
            const node = {};
            if (tokens[index] === '(') {
                index++; // Skip '('
                node.left = parseExpression();
                node.type = tokens[index++];
                node.right = parseExpression();
                index++; // Skip ')'
            } else {
                node.type = 'operand';
                node.value = tokens[index++];
            }
            return node;
        }

        return parseExpression();
    } catch (error) {
        console.error("Error parsing AST:", error);
        throw new Error("Invalid rule string format");
    }
};

// Combine multiple rules into one AST
exports.combineRules = (rules) => {
    if (rules.length === 0) return null;
    let combinedAST = rules[0];
    for (let i = 1; i < rules.length; i++) {
        combinedAST = {
            type: 'AND',
            left: combinedAST,
            right: rules[i]
        };
    }
    return combinedAST;
};
exports.evaluateRuleRequest = async (req, res) => {
    const { ruleId, userData } = req.body; // Extract ruleId and userData
    console.log('Request body:', req.body); // Log the request body

    try {
        // Fetch the rule from MongoDB by ruleId
        const rule = await Rule.findById(ruleId);

        if (!rule) {
            return res.status(404).json({ message: 'Rule not found' });
        }

        // Evaluate the rule against user data
        const result = evaluateAST(rule.ast, userData);
        console.log('Evaluation Result:', result); // Log result for debugging

        // Send the result back to the client
        res.status(200).json({ success: true, result });
    } catch (error) {
        console.error('Error in evaluateRule:', error);
        res.status(500).json({ message: 'Error evaluating rule', error: error.message ,error:error});
    }
};