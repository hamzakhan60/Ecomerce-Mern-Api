const loginModel = require("../models/login");
const bcrypt = require("bcrypt");
const mongoose = require('mongoose')
const customersModel = require("../models/customers");
const { ObjectId } = require("mongodb");
const loginService=require("../services/loginService");
const signUpServices=require("../services/signUpServices");

function calculateAge(dob) {
    console.log(dob);
    // Parse the date of birth
    const birthDate = new Date(dob);
    console.log(birthDate);
    const today = new Date();
  
    // Calculate the year difference
    let age = today.getFullYear() - birthDate.getFullYear();
  
    // Adjust for the month and day
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    console.log("age",age);
    return age;
}


const signUp=async(req,res)=>{
    const saltRound = 10;
    loginService.getUserLogin( req.body.email )
        .then(async(d) => {
            if (d) {
                res.status(409).send("User Already Exist");
            }
            else {
                const checkPhoneNo=await signUpServices.checkPhoneNumber(req.body.phoneNumber);
                if(checkPhoneNo)
                        res.status(409).send("Phone Number Already Exists");
                bcrypt.hash(req.body.password, saltRound, async (err, hashpasword) => {
                    if (err)
                        res.status(500).send("Internal Server Error");
                    else {
                        
                        console.log(hashpasword);
                        newLogin = {
                            email: req.body.email,
                            password: hashpasword,
                            role:'user',

                        }
                        const login=new loginModel(newLogin);
                        const loginResult=await loginService.addNewLogin(login);
                        newCustomer = {
                            firstName: req.body.firstName,
                            middleName: req.body.middleName,
                            lastName: req.body.lastName,
                            dateOfBirth: req.body.dateOfBirth,
                            phoneNumber: req.body.phoneNumber,
                            age: calculateAge(req.body.dateOfBirth),
                            address: {
                                streetName: req.body.address.streetName,
                                city: req.body.address.city,
                                country: req.body.address.country,
                                pinCode: req.body.address.pinCode,
                            },
                            cart:  new mongoose.Types.ObjectId(),
                            orderHistory: new mongoose.Types.ObjectId(),
                            login: loginResult._id,
                        }
                        console.log(newCustomer);
                        
                        const schema = new customersModel(newCustomer);
                        signUpServices.saveNewCustomer(schema)
                            .then((d) => {
                                res.status(201).send("User Registered Successfuly");
                            })
                            .catch(async (err) => {
                                const response=await loginService.deleteLogin(loginResult._id);
                                res.status(500).send("Err Occured Please try Again ");
                            })

                        // const token=tokenGenerator(req.body);
                        // res.send("User Added Successfuly" + result+ token);


                    }
                });
            }
        })
        .catch(() => {
            res.status(401).send("User Not Found");
        });
}

module.exports={
    signUp
}