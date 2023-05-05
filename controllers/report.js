const Expense=require('../models/user')
const AWS=require('aws-sdk');
const file=require('../models/fileLink')

exports.getfile=async(req,res,next)=>{
    try{
    const expenses=await Expense.findAll({where:{datumId:req.user.id}})
    
    const stringExpense=JSON.stringify(expenses);
    const userId=req.user.id
    const filename=`expense${userId}/${new Date()}.txt`;
    const fileUrl= await uploadfile(stringExpense,filename);
    const details=file.create({fileLink:fileUrl,datumId:req.user.id})
  return res.status(200).json({fileUrl,success:true})}

  catch(err){
    console.log(err)
    return res.status(500).json({fileUrl : '',success:false})
  }
}

function uploadfile(data,fileName){
    const BUCKET_NAME=process.env.BUCKET_NAME;
    const IAM_USER_KEY=process.env.IAM_USER_KEY;
    const IAM_USER_SECRET=process.env.IAM_USER_SECRET;

    let s3Bucket=new AWS.S3({
        accessKeyId:IAM_USER_KEY,
        secretAccessKey:IAM_USER_SECRET,
        //Bucket:BUCKET_NAME
    })

    
        var params={
            Bucket:BUCKET_NAME,
            Key:fileName,
            Body:data,
            ACL:'public-read'
        }

        return new Promise((res,rej)=>{
            s3Bucket.upload(params,(err,s3response)=>{
                if(err){
                    console.log('Something went wrong',err);
                    rej(err);
                }
                else{
                    console.log('success',s3response);
                  res(s3response.Location)
                }
            })
        })
       
    
}