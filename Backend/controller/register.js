const User = require("../models/user.js");
// const validator = require("deep-email-validator");
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');
const UserOTPVerification = require('../models/userOtpVerification.js')
const validator = require('@devmehq/email-validator-js')
require('dotenv').config()

const register = async (req, res) => {
  const fromMail = process.env.EMAIL_USERNAME
  const password = process.env.EMAIL_PASSWORD
  async function SendEmail(otp, toMail){try{
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: fromMail,
        pass: password,
      },
    });
    const info = await transporter.sendMail({
      from: fromMail, // sender address
      to: toMail, // list of receivers
      subject: "OTP Verification",
      html: `Enter <b>${otp}</b> to verify your email address`, // html body
    });
  
    console.log("Message sent: %s", info.messageId)
  }catch(err){
    console.log(err)
  }}
  try {
    if (req.body.email == null) {
      res.json({ status: "failed", message: "Enter email" });
    }
    if (req.body.name == null) {
      res.json({ status: "failed", message: "Enter name" });
    }
    if (req.body.userName == null) {
      res.json({ status: "failed", message: "Enter user name" });
    }
    if (req.body.age == null) {
      res.json({ status: "failed", message: "Enter age" });
    }
    if (req.body.address == null) {
      res.json({ status: "failed", message: "Enter address" });
    }
    if (req.body.gender == null) {
      res.json({ status: "failed", message: "Enter gender" });
    }
    if (req.body.phoneNumber == null) {
      res.json({ status: "failed", message: "Enter Phone number" });
    }
    // const isValidEmail = await validator.validate(req.body.email);
    const isValidEmail = await validator.verifyEmail({ emailAddress: req.body.email, verifyMx: true, verifySmtp: true, timeout: 3000 });
    if (false) {
      console.log(isValidEmail)
      res.json({ status: "failed", message: "Not a valid email" });
    } else {
      console.log(isValidEmail);
      const user = new User({
        name: req.body.name,
        age: req.body.age,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        gender: req.body.gender,
        address: req.body.address,
        userName: req.body.userName,
      });
      const isUserAlreadyExist = await User.findOne({
        userName: req.body.userName,
      });
      if (isUserAlreadyExist) {
        res.json({ status: "failed", message: "Username already exist!" });
      } else {
        await user.save();
        const otp = `${Math.floor(1000 + Math.random()*9000)}`
        SendEmail(otp, user.email)
        const saltRounds = 10;
        await bcrypt.genSalt(saltRounds,async function(err, salt) {
          await bcrypt.hash(otp, salt,async function(err, hash) {
            const userOtpVerification = new UserOTPVerification({
              otp: hash,
              userName: user.userName,
              createdAt: Date.now(),
              expiresAt: Date.now() + 3600000
            })
            await userOtpVerification.save()
          });
      });
        res.json({ status: "success", message: "user has been created" });
      }
    }
  } catch (err) {
    console.log(err);
    res.json({ status: "failed", message: "Server error" });
  }
};

module.exports = register;
