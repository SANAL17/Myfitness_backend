const express=require('express')

const adminController=require('../Controllers/adminController')

const adminrouter=new express.Router()

adminrouter.post('/admin/register',adminController.adminRegister)

//login

adminrouter.post('/admin/login',adminController.adminLogin)


module.exports=adminrouter