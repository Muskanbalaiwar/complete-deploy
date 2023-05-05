const express = require('express');

const adminController = require('../controllers/leaderBoard');

const authen=require('../middleware/autho')

const router = express.Router();
router.get('/premium/showBoard',authen.author,adminController.getAll);


module.exports=router;