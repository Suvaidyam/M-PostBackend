const express = require("express");
const router = express.Router();

// login api routes

const Login = require("./Login");
router.post("/login", Login);

// register routes

const register = require("./Register");
router.post("/register", register);

// otp generator routes

const Otp = require("./OtpGenerate");
router.post("/otp", Otp);

// verify otp routes
const verifyOtp = require("./VerfyOtp");
router.post("/verifyotp", verifyOtp);

// forgot password routes
const forgetpassword = require("./ChangePassword");
router.post("/forgetpassword", forgetpassword);

// verify token routes
const verifyToken = require("./VerifyToken");

const logout = require("./Logout");
router.post("/logout", verifyToken, logout);

module.exports = router;
