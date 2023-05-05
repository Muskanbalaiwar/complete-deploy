const razorpay=require('razorpay');
const orders=require('../models/orders');

const users=require('../models/signData');
//const Order = require('../models/orders');
//const Razorpay = require('razorpay');


exports.preminum=async(req,res)=>{
    try{
        var rzp = new razorpay({
            key_id:process.env.key_id,           
            key_secret:process.env.key_secret,
          });
          
         // console.log('key id : '+process.env.RAZORPAY_KEY_ID)
        const amount=2500;
        rzp.orders.create({amount, currency:"INR"},(err,order)=>{
            if(err){
                throw new Error(JSON.stringify(err));
            }
            const data=req.user.createOrder({orderid:order.id,status:'PENDING'}).then(()=>{
             
                return res.status(201).json({order,key_id:rzp.key_id})
            })

           .catch(err=>{
           console.log(err);
           })
        })
    }
    catch(err){
        console.log(err);
        orders.update(
          {
              paymentid: payment_id,status: 'FAILED',
},
{
  where: { paymentid: null, orderid:order_id,status:'PENDING' },
},
      )
        res.status(403).json({message:'something went wrong',error:err,});
    }
}


exports.addpremium=async(req,res)=>{
    try{
        const payment_id=req.body.payment_id;
        const order_id=req.body. order_id;
        console.log('payment id : '+payment_id);

        console.log('payment id : >>>>>>'+req.user.id);

        orders.findOne({where:{orderid:order_id,}}).then(order=>{
          
          orders.update(
            {
                paymentid: payment_id,status: 'Successful',},
  {
    where: { paymentid: null, orderid:order_id,status:'PENDING' }})
    .then(()=>{
    users.update({
            ispremium:true,
    },{where:{ispremium:null,id:req.user.id}}
    
    )
  }).then(()=>{
           return res.status(202).json({success:true,message:'Transiction Seccess'})
          })
          .catch(err=>{
            throw new Error(err);})
          })
        .catch(err=>{
            throw new Error(err);
          })
    }
    catch(err){
        orders.update(
            {
                paymentid: payment_id,status: 'FAILED',
  },
  {
    where: { paymentid: null, orderid:order_id,status:'PENDING' },
  },
        )
    }
}