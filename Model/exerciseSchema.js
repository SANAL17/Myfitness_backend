const mongoose = require("mongoose")

const exerciseSchema = new mongoose.Schema({
    bodypart:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    target:{
        type:String,
        required:true
    },
    equipment:{
        type:String,
        required:true
    },
    exerciseImage:{
        type:String,
        required:true
    },
    // userId:{
    //     type:String,
    //     required:true
    // }
})

const exercises= mongoose.model("exercise",exerciseSchema)

module.exports = exercises