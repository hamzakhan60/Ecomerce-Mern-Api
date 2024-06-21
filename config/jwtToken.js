const jwt=require("jsonwebtoken");
require('dotenv').config();

const secretKey= process.env.secretKey;
function tokenGenerator(user)
{
    console.log(user);
    const paylod={
        email:user.email,
        name:user.name,
    }
    const option ={
        expiresIn:'24h',
    }
    return jwt.sign(paylod,secretKey,option);

}
module.exports={
    tokenGenerator,
   };