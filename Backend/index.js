const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const route = require('./route/route.js')

const app = express()

app.use(express.json())
app.use(cors())
app.use('/', route)

mongoose.connect("mongodb+srv://bhaveshgautam2302:YJu8OXkT5uIH0an3@cluster0.ee2zw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("Connected to database")
}).catch((err)=>{
    console.log(err)
})

app.listen(8800, ()=>{
    console.log("server is running at port 8800")
})