const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    // userType:{
    //     type:String,
    //     required:true,
        
    // },
    secretkey:{
        type:String,
        required:true,
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
    // },
    // title:{
    //     type:String,
    //     required: true,

    // },
    // description:{
    //     type:String,
    //     required: true,

    // },
    // image:{
    //     type:String,
    //     required: true,


    // }

});


// Create a model-collection in mongodb
const admins = mongoose.model("admins", adminSchema);

module.exports=admins;