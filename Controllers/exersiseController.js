const exercises = require('../Model/exerciseSchema')

exports.addExercise = async (req,res)=>{
    console.log("inside add exercise");

    // get userid
    const userId = req.payload
    // get exercise image 

    const exerciseImage = req.file.filename

    // get exercise details
    const{bodypart,name,target,equipment}= req.body

     console.log(userId,bodypart,name,target,equipment,exerciseImage);

    // logic
    //res.status(200).json("Add exercise request received")

    try{
        const existingExercise = await exercises.findOne({name})
        if(existingExercise){
            res.status(402).json("Exercise Allready exist")

        }
        else{
            const newExercise = new exercises({
                userId,bodypart,name,target,equipment,exerciseImage

            })
            await newExercise.save()
            res.status(200).json(newExercise)
        }

    }
    catch(err){
        res.status(404).json({message:err.message})

    }
}

// get all exercises
exports.getAllAdminExercises=async(req,res)=>{
    // get userId
    const userId = req.payload;
    // get all exercises
    try{
        // api call
        const adminExercise = await exercises.find({userId})
        res.status(200).json(adminExercise)

    }catch(err){
        res.status(401).json("intrenal server error" + err.message);
    }

}

// get all exercises
exports.getAllExercises= async(req,res)=>{

    const searchKey= req.query.search
    const query={
        bodypart:{
             $regex : searchKey ,
             $options : "i"

    }
    }

    try{
        const allExercises = await exercises.find(query)
        res.status(200).json(allExercises) // send all to frontend

    }
    catch(err){
        res.status(401).json("internal server error" + err.message)

    }
}

//update Exercise 
exports.updateExercise=async(req,res)=>{
    const {bodypart,name,target,equipment,exerciseImage} = req.body
    const uploadImage = req.file?req.file.filename:exerciseImage
    userId = req.payload
    const {pid} = req.params
    try{
        // 
        const updateExercise = await exercises.findByIdAndUpdate({_id:pid},{bodypart,name,target,equipment,exerciseImage:uploadImage,userId})
        await updateExercise.save()
        res.status(200).json(updateExercise)

    }catch(err){
        
        res.status(401).json("internal server error "+ err.message)

    }
}


// delt exercise
exports.deleteExercise = async(req,res)=>{

    const {pid}=req.params;

    try{
        const deleteexercise = await exercises.findOneAndDelete({_id:pid})
        res.status(200).json(deleteexercise)

    }
    catch(err){
        res.status(401).json("intrenal server error" + err.message);


    }



}

// get one exercise
exports.getOneExercise=async(req,res)=>{
    // get userId
    const {pid}=req.params;    // get all exercises
    try{
        // api call
        const oneExercise = await exercises.findOne({_id:pid})
        res.status(200).json(oneExercise)

    }catch(err){
        res.status(401).json("intrenal server error" + err.message);
    }

}