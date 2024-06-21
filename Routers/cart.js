const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();
const { tokenDecoder1 } = require("../Middleware/tokenDecoder");
const { authorizeUser } = require("../Middleware/authorization");
const cartController=require("../Controllers/cartController");



router.use(authorizeUser);
router.use(tokenDecoder1);

router.get("/", cartController.getCart);
router.put("/", cartController.updateCart);
router.post("/", cartController.addIntoCart);
  

router.delete("/",cartController.deleteProductFromCart);
module.exports = router;