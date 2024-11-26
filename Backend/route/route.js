const express = require('express')
const register = require('../controller/register.js')

const route = express.Router()

route.get('/', (req,res)=>{
    res.json({message: "Hello"})
})

route.post('/register', register)

module.exports = route