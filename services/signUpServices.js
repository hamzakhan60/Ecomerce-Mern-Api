const customersModel = require("../models/customers");


const checkPhoneNumber=async(phoneNo)=>{
    try{
        const response= await customersModel.findOne({phoneNumber:phoneNo});
        return response;
    }catch(err){
        throw new Error ("Error Occured while login")
    }
}
const saveNewCustomer=async(newCustomer)=>{
    try{
       const response= await newCustomer.save();
       return response;
    }catch(err){
        throw new Error("Err Occured while save new Customer");
    }
}


module.exports={
    checkPhoneNumber,
    saveNewCustomer,
}