//otpModel.js
const mongoose = require('mongoose');
const { sendVerificationEmail } = require('../utils/mailSender');

const otpSchema = new mongoose.Schema({
  Email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
    createdAt: {
        type: Date,
        default: Date.now,
        // default: new Date(),
        // expires: 60*2 , // The document will be automatically deleted after 2 minutes of its creation time
    },
});

otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 });

otpSchema.pre("save", async function (next) {

  // Only send an email when a new otp is created
  if (this.isNew) {

    await sendVerificationEmail(this.Email, this.otp);
  }
  next();
});

const OTP = mongoose.model("OTP", otpSchema);
module.exports = OTP