const loginModel=require("../models/login");


const getUserLogin=async(email)=>{
    try{
        const response= await loginModel.findOne({email:email});
        return response;
    }catch(err){
        throw new Error ("Error Occured while login")
    }
}
const addNewLogin=async(login)=>{
    try{
        const response=await login.save();
        return response;
    }catch(err){
        throw new Error ("Error Occured while add new user Login")
    }
}
const deleteLogin=async(id)=>{
    try{
     const response=await loginModel.findByIdAndDelete(id);
     return response;
    }catch(err){
        throw new Error("Error Occured while deleting Login ");
    }
}



module.exports={
    getUserLogin,
    addNewLogin,
    deleteLogin
}