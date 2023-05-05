const express = require('express');

const adminController = require('../controllers/purchase');

const authen=require('../middleware/autho')

const router = express.Router();

router.post('/premium/post',authen.author,adminController.addpremium)


router.get('/premium/get',authen.author,adminController.preminum);


module.exports=router;