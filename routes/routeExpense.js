const express = require('express');

const adminController = require('../controllers/expenseController');

const authen=require('../middleware/autho')

const router = express.Router();

router.post('/user/post',authen.author,adminController.postData)

router.get('/user/getData/:page/:limit',authen.author,adminController.getAll);
router.delete('/user/deleteData/:id',authen.author,adminController.delete);
router.put('/user/getData/:id',adminController.getData)

module.exports=router;