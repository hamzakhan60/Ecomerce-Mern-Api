const express=require("express");
const mongoose=require('mongoose')
const router=express.Router();
const loginModel=require("../models/login");
const bcrypt=require("bcrypt");
const {tokenGenerator}=require("../config/jwtToken");




router.get('/',async (req,res)=>{
    console.log(req.query);
    loginModel.findOne({email:req.query.email})
    .then((d)=>{
        console.log(d);
        console.log(d.name)
        console.log(req.query.password)
        bcrypt.compare(req.query.password,d.password,(err,result)=>{
            if(err)
                console.log("Error Occured when comparing Password");
            else{
                if(result)
                {
                    console.log("Password Matched");
                    const token=tokenGenerator(d);
                    const responseData={
                        token:token,
                        role:d.role,
                        id:d._id,
                    }
                    res.status(200).json(responseData);
                }
                else
                    res.status(401).send("Please Enter Correct Password");
            }
        })  
    })      
    .catch(()=>{
        res.status(404).send("User not found ");
    })

})

module.exports=   router
