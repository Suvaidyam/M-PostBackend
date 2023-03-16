const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otpCode: {
    type: String,
    required: true,
  },
  expirIn: {
    type: Number,
    required: true,
  },
});

const Otp = mongoose.model("Otp", OtpSchema);

module.exports = Otp;
