const express = require("express");
const router = express.Router();
const { tokenDecoder1 } = require("../Middleware/tokenDecoder");
const { authorizeUser } = require("../Middleware/authorization");
const userController=require("../Controllers/userController");




router.use(tokenDecoder1);
router.use(authorizeUser);
router.get("/", userController.getUserData);

router.put("/",userController.updateUserData);
module.exports = router;