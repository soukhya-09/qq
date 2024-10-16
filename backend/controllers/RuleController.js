const Rule = require('../models/RuleModel')
const RuleService = require('../services/RuleService')


exports.createRule =  async(req,res)=>{
    try {
        const {ruleString, ruleName}= req.body
        const ast = RuleService.createAST(ruleString)
        const rule = new Rule({name:ruleName,ast})
        await rule.save()
        res.status(200).json(rule)
        
    } catch (error) {
        res.status(500).json({message:'error creating rule',error})
        
    }//671004994d5e13ca7409cc73  671004a4c18d827695a971fb
}

exports.combineRules = async(req,res)=>{
    try {
        const {ruleIds} = req.body
        
        const rules = await Rule.find({_id:{$in:ruleIds}})
        const combinedAST = RuleService.combineRules(rules.map(r=>r.ast))
        res.status(200).json(combinedAST)
    } catch (error) {
        res.status(500).json({message:'error combining rules',error})
    }
}

exports.evaluateRule = async(req,res)=>{
    try{
        const {ruleId,userData} = req.body
        const rule = await Rule.findById({_id:ruleId})
       
        const result = RuleService.evaluateRuleRequest(rule.ast,userData)
        res.status(200).json({eligible:result})

    }catch(error){
        res.status(500).json({message:'error evaluating rule',error})

    }
}