const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();
const { tokenDecoder1 } = require("../Middleware/tokenDecoder");
const customersModel = require("../models/customers");
const { authorizeUser } = require("../Middleware/authorization");
const loginModel = require("../models/login");

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
    console.log("age", age);
    return age;
}

router.use(tokenDecoder1);
router.use(authorizeUser);
router.get("/", async (req, res) => {


    const data = await customersModel.findOne({ login: req.query.id })
    const age = {
        age: calculateAge(data.dateOfBirth)
    }
    customersModel.findOneAndUpdate({ _id: data._id }, age, { new: true }).populate({
        path: 'login',
        model: loginModel
    })
        .then((d) => {
            console.log(d);
            res.status(200).send(d);
        })
        .catch(err => {
            res.status(500).send("Internal Server Error");
        })

});

router.put("/", (req, res) => {

    const update = {
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
    }
    customersModel.findOneAndUpdate({ login: req.query.id }, update, { new: true }).populate({
        path: 'login',
        model: loginModel
    })
        .then(async (d) => {


            console.log(d);
            res.status(200).json(d);

        })
        .catch(err => {
            res.status(500).send("Err occured in finding Data");
        })


});
module.exports = router;