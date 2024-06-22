const customerServices=require("../services/customerServices");

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


const getUserData=async(req,res)=>{
    const data = await customerServices.getCustomerById( req.query.id )
    const age = {
        age: calculateAge(data.dateOfBirth)
    }
    customerServices.updateCustomer(data._id,age)
        .then((d) => {
            console.log(d);
            res.status(200).send(d);
        })
        .catch(err => {
            res.status(500).send("Internal Server Error");
        })
}

const updateUserData=async(req,res)=>{
     
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
    console.log(req.query.id);
    console.log(req.body);
    customerServices.updateCustomer(req.body._id,update)
        .then( (d) => {
            console.log(d);
            res.status(200).json(d);
        })
        .catch(err => {
            res.status(500).send("Err occured in finding Data");
        })


}

module.exports={
    getUserData,
    updateUserData,
}