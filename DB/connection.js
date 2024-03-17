// node + mongodb connection

const mongose = require('mongoose')

const connectionString = process.env.DATABASE

mongose.connect(connectionString).then(()=>{
    console.log("Mongodb connection established");
})
.catch(err=>{
    console.log("mongodb connection error");
})