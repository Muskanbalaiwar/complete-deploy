const User=require('../models/signData');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

exports.postData=async(req,res,next)=>{
  try{
    const name=req.body._Name;
    const email=req.body._Email
    const password=req.body._Password
    //console.log(' hello data');
    
    const salt=10;
    bcrypt.hash(password,salt,async (err,hash)=>{
      console.log(err);
      //console.log('hash')
      const data=await User.create({name:name,email:email,password:hash})
      //console.log('answer')
    res.status(201).json({details:data})
    })
    }
    catch(err){
        res.status(500).json({error:err})
    }
}

function generateToken(id,ispremium){
  return jwt.sign({userId:id,premium:ispremium},'ScreatKey');
}


exports.login=async(req,res,next)=>{
  try{
  const email=req.body._email;
  const password=req.body._password
  //console.log(password);
//console.log(email);
 const user= await User.findAll({where:{email}
  })
  //console.log('user');
  if(user.length>0){
   bcrypt.compare(password,user[0].password, (err,result)=>{
    if(err){
      throw new Error('Something went wrong');
    }
    if(result===true)
    {
      res.status(200).json({success:true,message:'login seccessfully',token:generateToken(user[0].id,user[0].ispremium)})
    }

    else{
      res.status(400).json({success:false,message:'password is incorrect'})
    }
   }) 
  }
  else{
    res.status(404).json({success:false,message:'User not exist'})
  }
}
  catch(err){
   
   res.status(500).json({message:err,success:false})
}
}