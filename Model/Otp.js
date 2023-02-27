const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  otpCode: {
    type: String,
  },
  expirIn: {
    type: Number,
  },
});

const Otp = mongoose.model("Otp", OtpSchema);

module.exports = Otp;
