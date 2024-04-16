const express = require('express');
const otpController = require('../controllers/otpController');
const router = express.Router();
router.post('/', otpController.sendOTP);
module.exports = router;