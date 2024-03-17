// // usr logics

 const users = require("../Model/userSchema");
 const jwt = require('jsonwebtoken')

// register logic
exports.register=async (req,res)=>{
    console.log("inside register function");
    try{
        const {username,email,password} = req.body
        console.log(`${username},${email},${password}`);
        
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(402).json("User already exists")
        }
        else{
            const newUser = new users({
                username,email,password
            })
            await newUser.save()
            res.status(200).json("User created successfully")
        }


    }catch(err){
        res.status(500).json("server error")


    }
    // res.status(200).json("register req received")
    
}

// get all user
exports.getAllUsers=async(req,res,next)=>{
    let user;
    try{
        user = await users.find()

    }
    catch(err){
        return   next(err)
    }
    if(!user){
        return res.status(500).json({message : "unecpecteed error"})
    }
    return res.status(200).json({user})

}

// login
exports.login=async(req,res)=>{
    const {email,password}= req.body

    try{
        const user = await users.findOne({email,password})
        if(user){
            const token = jwt.sign({userId:user._id},"sanal")
            console.log(token);
            res.status(200).json({user,token})

        }else{
            res.status(401).json("invalid user")
        }
    }
    catch(err){
        res.status(500).json("server error"+err.message)
    }
}

// update user

exports.updateUser= async(req,res)=>{
    console.log("in update function");
    const id =  req.params.id;
    const {username,email,password} = req.body;
    if(
        !username && 
        username.trim() === ""  &&
        !email && 
        email.trim() === ""  &&
        !password && 
        password.trim() === ""  
    ) {
        return res.status(402).json({message : "Inavalid Inputs"})
    }

    let user

    try{
        user = await users.findByIdAndUpdate(id,{username,email,password});

    }
    catch(err){
        return console.log(err);
    }
    if(!user){
        return res.status(500).json({message : "Something went wrong"})
    }
    res.status(200).json({message: "Updated successfully"})
    

}

// dlete user

exports.deleteUser= async(req,res)=>{
    const id =  req.params.id;
    
        try{
           const user = await users.findByIdAndDelete(id);
           if(user){
            res.status(200).json({message: "deleted successfully"})
        }
        else{
            return res.status(500).json({message : "Something went wrong"})
        }

        } 
        catch(err){
         return res.status(500).json(err)
        }
        
        

}


