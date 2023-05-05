const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const EMAIL=process.env.EMAIL
const PASSWORD=process.env.PASSWORD;
const password_table=require('../models/password')
const sign=require('../models/signData')
//const { EMAIL, PASSWORD } = require('../env.js')

exports.getbill = async (req, res) => {
    const  userEmail  = req.body._email;
    let config = {
        service : 'gmail',
        auth : {
            user: EMAIL,
            pass: PASSWORD
        }
    }

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
        theme: "default",
        product : {
            name: "Muskan ",
            link : 'https://mailgen.js/'
        }
    })

    let message = {
        from : EMAIL,
        to : userEmail,
        subject: "RESET PASSWORD Expense Tracker",
        html: '<p>Click <a href="http://127.0.0.1:5501/reset.html">here</a> to reset your password</p>',
    }
    const userData= await sign.findOne({where:{email:userEmail}});
    await password_table.create({isactive:true,datumId:userData.id})

    transporter.sendMail(message).then((resp) => {
        console.log('mail sended')
        return res.status(201).json({
            msg: "you should receive an email"
        })
    }
    
    ).catch(err => {
        return res.status(500).json({ err })
    })

    // res.status(201).json("getBill Successfully...!");
}

