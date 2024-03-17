// loads .env file
require ('dotenv').config();

// import express
const express = require('express')

const cors = require('cors')

const router = require('./Routs/router')
const adminRouter = require('./Routs/adminRouts')

const appMiddleware = require('./Middleware/appMiddleware')

// const adminRouter = require('./Routs/adminRouts')

const db = require('./DB/connection');

// create server application

const fitnessServer = express()

// use cors
fitnessServer.use(cors())
fitnessServer.use(express.json())
fitnessServer.use(appMiddleware)
fitnessServer.use(router)
fitnessServer.use('/uploads',express.static('./uploads')) // image exportinfg front end
fitnessServer.use(adminRouter)

// creating port
const PORT = 4000 || process.env.PORT

// server listen
fitnessServer.listen(PORT,()=>{
    console.log("Listening on " + PORT);
})

// localhost:4000 res-> started
fitnessServer.get('/',(req,res)=>{
    res.send(`<h1>Server start</h1>`)
})

