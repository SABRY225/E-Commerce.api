// models/otpModel.js
const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  CreatedAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60, 
  },
});
// Define a function to send emails
async function sendVerificationEmail(Email, Otp) {
  try {
    const mailResponse = await mailSender(
      Email,
      "Verification Email",
      `<h1>Please confirm your OTP</h1>
       <p>Here is your OTP code: ${Otp}</p>`
    );
    console.log("Email sent successfully: ", mailResponse);
  } catch (error) {
    console.log("Error occurred while sending email: ", error);
    throw error;
  }
}
otpSchema.pre("save", async function (next) {
  console.log("New document saved to the database");
  // Only send an email when a new document is created
  if (this.isNew) {
    await sendVerificationEmail(this.Email, this.Otp);
  }
  next();
});
const OTP = mongoose.models.OTP ||mongoose.model('OTP', otpSchema);

module.exports = OTP;