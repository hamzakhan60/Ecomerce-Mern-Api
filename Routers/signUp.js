const express = require ("express");
const mongoose = require('mongoose')
const router = express.Router();
const loginModel = require("../Modles/login");
const bcrypt = require("bcrypt");
const { tokenGenerator } = require("../Controllers/jwtToken");
const customersModel = require("../Modles/customers");
const { ObjectId } = require("mongodb");




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

router.post('/', async (req, res) => {

    const saltRound = 10;
    loginModel.findOne({ email: req.body.data.email })
        .then((d) => {
            if (d) {
                res.status(409).send("User Already Exist");
            }
            else {
                bcrypt.hash(req.body.data.password, saltRound, async (err, hashpasword) => {
                    if (err)
                        res.status(500).send("Internal Server Error");
                    else {
                        
                        console.log(hashpasword);
                        newLogin = {
                            email: req.body.data.email,
                            password: hashpasword,
                            role:'user',

                        }
                        const login=new loginModel(newLogin);
                        const loginResult=await login.save();
                        newCustomer = {
                            firstName: req.body.data.firstName,
                            middleName: req.body.data.middleName,
                            lastName: req.body.data.lastName,
                            dateOfBirth: req.body.data.dateOfBirth,
                            phoneNumber: req.body.data.phoneNumber,
                            age: calculateAge(req.body.data.dateOfBirth),
                            address: {
                                streetName: req.body.data.address.streetName,
                                city: req.body.data.address.city,
                                country: req.body.data.address.country,
                                pinCode: req.body.data.address.pinCode,
                            },
                            cart:  new mongoose.Types.ObjectId(),
                            orderHistory: new mongoose.Types.ObjectId(),
                            login: loginResult._id,


                        }
                        
                        const schema = new customersModel(newCustomer);
                        schema.save()
                            .then((d) => {
                                res.status(201).send("User Registered Successfuly");
                            })
                            .catch(async (err) => {
                                await loginModel.findOneAndDelete({_id: loginResult._id});
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
});

module.exports = router
