// controllers/otpController.js
const otpGenerator = require('otp-generator');
const OTP = require('../model/otpModel');
const Customer = require('../model/customerModel');

const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
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
      result = await OTP.findOne({ Otp: otp  });
    }
    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);
    res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
      otp,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const verifyOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const existingOTP = await OTP.findOneAndDelete({  email, otp  });
    if (existingOTP) {
      const user = await Customer.findOne({ email });
      if (user) {
        user.verified = true;
        await user.save();
        // OTP is valid
        res.status(200).json({ success: true, message: 'OTP verification successful' });
      } else {
        res.status(404).json({ success: false, message: 'User not found' });
      }
    } else {
      // OTP is invalid
      res.status(400).json({ success: false, message: 'Invalid OTP' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};
module.exports = {
  verifyOTP,
  sendOTP
}