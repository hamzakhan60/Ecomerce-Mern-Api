const express=require("express");
const mongoose=require('mongoose')
const router=express.Router();
const loginController=require("../Controllers/loginController");




router.get('/',loginController.getUserData);

module.exports=   router
