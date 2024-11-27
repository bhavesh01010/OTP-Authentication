const express = require('express')
const register = require('../controller/register.js')
const login = require('../controller/login.js')
const verifyOTP = require('../controller/verifyOTP.js')

const route = express.Router()

route.get('/', (req,res)=>{
    res.json({message: "Hello"})
})

route.post('/register', register)
route.post('/login', login)
route.post('/verifyOtp', verifyOTP)

module.exports = route