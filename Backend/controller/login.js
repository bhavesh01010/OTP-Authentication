const User = require("../models/user.js");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const UserOTPVerification = require("../models/userOtpVerification.js");

const login = async (req, res) => {
  const fromMail = process.env.EMAIL_USERNAME;
  const password = process.env.EMAIL_PASSWORD;
  async function SendEmail(otp, toMail) {
    try {
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
        html: `Enter <b>${otp}</b> to verify your eail address`, // html body
      });
      console.log("Message sent: %s", info.messageId);
    } catch (err) {
      console.log(err);
    }
  }
  try {
    const userName = req.body.userName;
    const email = req.body.email;
    const user = await User.findOne({ userName: userName });
    if (user) {
      if (email == user.email) {
        res.json({ status: "success", message: "right email and userName" });
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
        SendEmail(otp, email);
        const saltRounds = 10;
        await bcrypt.genSalt(saltRounds, async function (err, salt) {
          await bcrypt.hash(otp, salt, async function (err, hash) {
            const userOtpVerification = new UserOTPVerification({
              otp: hash,
              userName: user.userName,
              createdAt: Date.now(),
              expiresAt: Date.now() + 3600000,
            });
            await userOtpVerification.save();
          });
        });
      } else {
        res.json({ status: "failed", message: "wrong email(temporary)" });
      }
    } else {
      res.json({ status: "failed", message: "wrong userName(temporary)" });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = login;
