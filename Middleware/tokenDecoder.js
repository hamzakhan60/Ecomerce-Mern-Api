
const jwt=require("jsonwebtoken");
require('dotenv').config();
const secretKey= process.env.secretKey;

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
  module.exports={tokenDecoder1};
  