const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();
const { tokenDecoder1 } = require("../Middleware/tokenDecoder");
const { authorizeAdmin } = require("../Middleware/authorization");
const adminController =require("../Controllers/adminController");




router.use(tokenDecoder1);
router.use(authorizeAdmin);

router.get("/home",adminController.adminHomeData);



// GET request to fetch all products from the view
router.get('/products',adminController.getAllProducts);

// POST request to add a new product
router.post('/products', adminController.addNewProduct);

// PUT request to update a product
router.put('/products/:id', adminController.updateProduct);
router.delete('/products/:productId',adminController.deleteProduct);

router.get('/orders', adminController.getAllOrders);

router.get("/customers",adminController.getAllCustomers)
        



module.exports = router