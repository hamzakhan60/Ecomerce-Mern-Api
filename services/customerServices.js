const customerViewModel=require("../models/CustomerView");
const customersModel=require("../models/customers");
const loginModel=require("../models/login");

const getAllCustomer=async()=>{
    try{
        const response=await customerViewModel.find();
        return response;

    }catch(err){
        throw new Error("Error occured fetching customers Data");  
    }
}

const getCustomerById=async(id)=>{
    try{
        const response=await customersModel.findOne({login:id});
        console.log(response);
        return response;
    }catch(err){
        throw new Error("Error Occured Fetching customer's data");
    }
}

const updateCustomer=async(id,data)=>{
    try{
      const response =await customersModel.findOneAndUpdate({_id:id}, data, { new: true }).populate({
        path: 'login',
        model: loginModel
    });
    console.log(response);
    return response;
    }catch(err){
        throw new Error("Error Occured updating Customer data");
    }
}
module.exports={
    getAllCustomer,
    getCustomerById, 
    updateCustomer,  
}
