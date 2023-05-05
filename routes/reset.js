const express = require('express');

const adminController = require('../controllers/reset');



const router = express.Router();

//console.log('controllers')

router.post('/reset/post',adminController.postData)



module.exports=router;