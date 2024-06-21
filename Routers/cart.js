const express = require("express");

const mongoose = require('mongoose');
const router = express.Router();
const { tokenDecoder1 } = require("../middleware/tokenDecoder");
const productsModel = require("../models/products");
const cartModel = require("../models/cart");
const customersModel = require("../models/customers");
const clothesModel = require("../models/clothes");
const fragranceModel = require("../models/fragrances");
const { authorizeUser } = require("../middleware/authorization");
const {getpipeline} =require("../pipelines/cartProductPrice");
const cartController=require("../Controllers/cartController");



router.use(authorizeUser);
router.use(tokenDecoder1);

router.get("/", cartController.getCart);
router.put("/", cartController.updateCart);
router.post("/", cartController.addIntoCart);
  

router.delete("/",cartController.deleteProductFromCart);
module.exports = router;