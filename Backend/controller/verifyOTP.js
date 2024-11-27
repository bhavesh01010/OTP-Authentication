const UserOtpVerification = require('../models/userOtpVerification.js')
const bcrypt = require('bcrypt')

const verifyOTP = async(req,res)=>{
    const userName = req.body.userName;
    const otp = req.body.otp
    const userOtpVerification = await UserOtpVerification.find({ userName })
    var count=0
    const user = await Promise.all(userOtpVerification.map(async (data) => {
        const validator = await bcrypt.compare(otp, data.otp);
        if (validator) {
            count++
            if(data.expiresAt>Date.now()){
                res.json({status: "success", message: "user verified"})
                data.expiresAt=Date.now()
                await data.save()
                return data
            }else{
                res.json({status: "failed", message: "Otp has been expired"})
            } // Return the user data if OTP is valid
        }
    }));
    if(count==0){
        res.json({status: "failed", message: "Wrong otp"})
    }
}

module.exports = verifyOTP