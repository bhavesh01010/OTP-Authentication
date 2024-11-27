const mongoose = require('mongoose')

const userOtpVerificationSchema = mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    }
})

const UserOtpVerification = mongoose.model('UserOTPVerification', userOtpVerificationSchema)

module.exports = UserOtpVerification