const express = require("express");
const mongoose = require('mongoose')
const router = express.Router();
const { tokenDecoder1 } = require("../Middleware/tokenDecoder");
const {authorizeUser}=require("../Middleware/authorization");
const orderController=require("../Controllers/orderController");




router.use(tokenDecoder1);
router.use(authorizeUser);
router.get("/",orderController.getOrders);
router.post("/", orderController.addNewOrder)
module.exports = router