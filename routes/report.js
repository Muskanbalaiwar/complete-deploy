const express = require('express');

const adminController = require('../controllers/report');

const authen=require('../middleware/autho');

const router = express.Router();

//console.log('controllers')

router.get('/file/get',authen.author,adminController.getfile)



module.exports=router;