const User = require("../models/user.js");

const login = async (req, res) => {
  try {
    const userName = req.body.userName;
    const email = req.body.email;
    const user = await User.findOne({ userName: userName });
    if(user){
        if(email == user.email){
            res.json({status: 'success', message: 'right email and userName'})
        }else{
            res.json({status: 'failed', message: 'wrong email(temporary)'})
        }
    }else{
        res.json({status: 'failed', message: 'wrong userName(temporary)'})
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = login
