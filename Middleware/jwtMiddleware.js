//
const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
    console.log('inside jwt middleware - Router-level-middleware');
            // get the token from user req
    const token = req.headers['authorization'].slice(7)
    console.log(token);
    try{

        // verify
        const tokenVerification= jwt.verify(token,'sanal')
        console.log(tokenVerification);

        req.payload = tokenVerification.userI

        next()

    }
    catch(err){
        res.status(401).json("Authorisation failed   please login again")

    }
}

module.exports = jwtMiddleware