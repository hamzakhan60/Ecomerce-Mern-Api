


const authorizeAdmin=(req,res,next)=>{
    console.log(req.query);
    if(req.query.role==="admin"){
        console.log("You are Authorized")
        next();
    }
    else
        {res.status(401).send("You are Not Authorized for This Action");}
}
const authorizeUser=(req,res,next)=>{
        console.log(req.query)
    if(req.query.role=="user"){
        console.log("You are Authorized")
        next();
    }
    else
        res.status(401).send("You are Not Authorized for This Action");
}

module.exports={authorizeAdmin,
    authorizeUser,}