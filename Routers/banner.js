const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();
const bannerModel=require("../models/banner");



router.get("/",async(req,res)=>{
    const data=await  bannerModel.find();
    if(data)
        res.status(200).send(data)
    else
        res.status(500).send("Failed to load Data");
})
module.exports=router


