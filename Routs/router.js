const express = require('express')

const userController = require('../Controllers/userController')

const exerciseController = require('../Controllers/exersiseController')

const jwtMiddleware = require('../Middleware/jwtMiddleware')

const multerConfig = require('../Middleware/multerMiddleware')
// create router for path
const router = new express.Router()

// Register API http://localhost:400/register
router.post('/register',userController.register)

// Register API http://localhost:400/login
router.post('/login',userController.login)

// get all user
router.get('/get-all-user/',userController.getAllUsers)

// update user
router.put("/update-user/:id",userController.updateUser)

// delete user
router.put("/delete-user/:id",userController.deleteUser)

// add exercise api [path]
router.post("/exercise/add",jwtMiddleware,multerConfig.single('exerciseImage'),exerciseController.addExercise)


// get all admin exercises  http://localhost:400/all-admin-exercises
router.get('/exercise/all-admin-exercises',jwtMiddleware,exerciseController.getAllAdminExercises)

// get all
router.get('/exercise/all-exercise',jwtMiddleware,exerciseController.getAllExercises)

// update project
router.put('/exercise/update-exercise/:pid',jwtMiddleware,multerConfig.single('exerciseImage'),exerciseController.updateExercise)

// dlt exercise
router.delete('/exercise/delete-exercise/:pid',jwtMiddleware,exerciseController.deleteExercise)

// get one project
router.get('/exercise/get-one-exercise/:pid',multerConfig.single('exerciseImage'),exerciseController.getOneExercise)

module.exports= router
