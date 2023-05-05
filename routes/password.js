const express = require('express');

const adminController = require('../controllers/password');

const authen=require('../middleware/autho');

const router = express.Router();

//console.log('controllers')

router.post('/password/forgotpassword',adminController.getbill)



module.exports=router;