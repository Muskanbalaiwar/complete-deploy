const User=require('../models/user');
const sign=require('../models/signData');
const sequelize=require('../util/database');
exports.postData=async(req,res,next)=>{
  
  const t=await sequelize.transaction();
  try{
    const amount=req.body.amn;
    const des=req.body.dec;
    const category=req.body.crt;
    const data=await User.create({amount:amount,description:des,category:category,datumId:req.user.id},{transaction:t})
const total=Number(req.user. totalExpense)+Number(amount);
    await sign.update({
      totalExpense: total
},{where:{id:req.user.id},
transaction:t
}

) 

await t.commit();
    res.status(201).json({details:data});}
    catch(err){
      await t.rollback();
        console.log(err);
    }
}

exports.getAll=async(req,res,next)=>{
try{

  console.log("req>>"+req.params)
  const page=parseInt(req.params.page)?parseInt(req.params.page):1;
  const size=parseInt(req.params.limit)?parseInt(req.params.limit):1;

  const skip=(page-1)*size;
    const data=await User.findAll({where:{datumId:req.user.id},offset: skip+1,
      limit: size});
   
    res.status(201).json({details:data,page,size});}

    catch(err){console.log(err)}
}

exports.delete=async(req,res,next)=>{
  
  const t=await sequelize.transaction();
    try{

    const id=req.params.id;
   
    const data=await User.findByPk(id);
   const total=Number(req.user.totalExpense)-Number(data.amount);
    await sign.update({
      totalExpense: total
},{where:{id:req.user.id},transaction:t}

)
    await User.destroy({where :{id:id,datumId:req.user.id}},{transaction:t});
   await t.commit();
    res.sendStatus(201);}
    catch(err){
      await t.rollback();console.log(err)}
  }

  exports.getData=async(req,res,next)=>{
    try{
    const id=req.params.id;
    const data=await User.findByPk(id);
    res.status(201).json({details:data});}
    catch(err){console.log(err)}
}


