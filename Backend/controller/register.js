const User = require("../models/user.js");
const validator = require("deep-email-validator");

const register = async (req, res) => {
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
    const isValidEmail = await validator.validate(req.body.email);
    if (!isValidEmail.valid) {
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
        res.json({ status: "success", message: "user has been created" });
      }
    }
  } catch (err) {
    console.log(err);
    res.json({ status: "failed", message: "Server error" });
  }
};

module.exports = register;
