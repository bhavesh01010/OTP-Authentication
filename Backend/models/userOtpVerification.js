const mongoose = require('mongoose')

const userOtpVerificationSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        required: true
    },
    expiresAt: {
        type: String,
        required: true
    }
})

const UserOtpVerification = mongoose.model('UserOTPVerification', userOtpVerificationSchema)

module.exports = UserOtpVerification