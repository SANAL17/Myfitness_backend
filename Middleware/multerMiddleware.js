const multer = require ('multer')

// store multer data

const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./uploads')
    },
    filename:(req,file,callback) =>{
        const filename = `image-${Date.now()}-${file.originalname}`
        callback(null,filename)

    } 
})

// filter
const fileFilter = (req,file,callback)=>{
    const allowedMimeTypes = ['image/png','image/jpeg','image/jpg','image/gif']
    if (allowedMimeTypes.includes(file.mimetype)){
        callback(null,true)
    }
    else{
        callback(null,false)
        return callback(new Error("Inavalid file type must be supporting type"))
    }
}

const multerConfig = multer({
    storage, fileFilter
})

module.exports = multerConfig