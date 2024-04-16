// controllers/otpController.js
const otpGenerator = require("otp-generator");
const OTP = require("../models/otpModels");
const User = require("../models/user");

exports.sendOTP = async (req, res) => {
  try {
    const { Email } = req.body;
    // Check if user is already present
    const checkUserPresent = await User.findOne({ Email });
    // If user found with provided email
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User is already registered",
      });
    }

    // let otpCreated = await OTP.findOne({ Email });
    // if (otpCreated) {
    //   return res.status(401).json({
    //     success: false,
    //     message: 'OTP already created: Please wait for 2 minutes to create a new',
    //   });
    // }

    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    let result = await OTP.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
      result = await OTP.findOne({ otp: otp });
    }
    const otpPayload = { Email, otp };
    const otpBody = await OTP.create(otpPayload);
    console.log("this is otp body" + otpBody);
    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otp,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};
