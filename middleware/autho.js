const jwt=require('jsonwebtoken');
const User=require('../models/signData');

 exports.author=(req,res,next)=>{
try{
    const token=req.header('Authorization')
   // console.log('token ' +token);
    const user=(jwt.verify(token,'ScreatKey'))
    //console.log('id : '+user.userId)
    User.findByPk(user.userId).then(user=>{
        //console.log(JSON.stringify(user))
        req.user=user;
        next();
    })
}
    catch(err){
        console.log(err);

    }
   
}

