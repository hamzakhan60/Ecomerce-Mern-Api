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
    loginModel.findOne({ email: req.body.email })
        .then((d) => {
            if (d) {
                res.status(409).send("User Already Exist");
            }
            else {
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
                        const loginResult=await login.save();
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
