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
function tokenDecoder(token){
    try {
        const decoded = jwt.verify(token, secretKey);
        const now = Date.now() / 1000; // Convert to seconds
    
        // Check expiration
        if (decoded.exp < now) {
          return false; // Token is expired
        }
    
        // Check specific data claim (replace 'role' with your desired claim)
        // if (decoded.role !== 'admin') {
        //   return false; // Insufficient permissions
        // }
    
        return true; 
      } catch (error) {
        console.log("Invalid Login");
        return false; 
       
       
      }

}
function tokenDecoder1(req,res,next){
  try {
    console.log(req.query);
      const decoded = jwt.verify(req.query.token, secretKey);
      const now = Date.now() / 1000; // Convert to seconds
  
      // Check expiration
      if (decoded.exp < now) {
          res.status(440).send("Your Login Session Has Been Expired") // Token is expired
      }
  
      next();
    } catch (error) {
      res.status(401).send("Invalid Login");

     
     
    }

}
module.exports={
    tokenGenerator,
    tokenDecoder,
    tokenDecoder1,};