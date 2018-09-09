const LoginCtrl=require("../controller/login.controller")
const express = require('express');
//const { getLatestCreditReportHandler, pullCreditHandler } = require('./creditapplication.controller');
const router = express.Router();
router.post('/login',LoginCtrl.UserLogin)
.get('/login',LoginCtrl.UserLogin);
router.post('/register', LoginCtrl.UserRegister);
router.get('/logout',LoginCtrl.UserLogout);

module.exports =router