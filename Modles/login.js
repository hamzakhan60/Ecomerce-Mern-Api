const mongoose=require("mongoose");

const loginSchema= new mongoose.Schema({
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true,unique:true},
    role:{type:String,enum:["admin","user"]},
})

const loginModel=mongoose.model('login',loginSchema);


module.exports= loginModel;
