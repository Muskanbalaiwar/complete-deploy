const User=require('../models/signData');
const bcrypt=require('bcrypt');
const password_tab=require('../models/password')
// const jwt=require('jsonwebtoken');
console.log(' hello data>>>>>>>>>>>>');
exports.postData=async(req,res,next)=>{
  try{
    const email=req.body._Email
    const password=req.body._Password
    const salt=10;
    bcrypt.hash(password,salt,async (err,hash)=>{
      console.log(err);
      await User.update({password:hash,},{where: { email:email }})

     const userData= await User.findOne({where:{email:email}});
console.log('heloo<<<<<<<<<<<')
await password_tab.update({isactive:false,},{where: { datumId:userData.id }})
    console.log(userData.id);

    res.status(201).json({msg:'password change Successfully'})
    })
    }
    catch(err){
        res.status(500).json({error:err})
    }
}