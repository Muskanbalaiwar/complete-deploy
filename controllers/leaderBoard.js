const User=require('../models/signData');
const Expense=require('../models/user');
const sequelize = require('../util/database');

exports.getAll=async (req,res,next)=>{
    try{
        const leaderBoardData=await User.findAll({
            attributes:['name','totalExpense'],

            order:[['totalExpense','DESC']]
        });
        const expenses=await Expense.findAll();
        

        
        //console.log(leaderBoardData)
        res.status(201).json(leaderBoardData);
       }
    
        catch(err){console.log(err)}
}