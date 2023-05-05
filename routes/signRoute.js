const express = require('express');

const adminController = require('../controllers/signController');

const router = express.Router();

router.post('/sign/post',adminController.postData)
router.post('/sign/post/login',adminController.login)



module.exports=router;