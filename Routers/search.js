const express = require("express");
const mongoose = require('mongoose')
const router = express.Router();
const { tokenGenerator } = require("../config/jwtToken");
const productsModel = require("../models/products");
const clothesModel = require("../models/clothes");
const fragranceModel = require("../models/fragrances");



router.get('/', async (req, res) => {
    const searchData = req.query.s;
    const regex = new RegExp(searchData, 'i'); // Case-insensitive search

    const query = {
        $or: [
            { ProductName: { $regex: regex } },
            { CategoryName: { $regex: regex } },
        ],
    };
    const product = await productsModel.find(query);
    if (product)
        res.send(product);
    else
        res.send("Not have Product");

})
module.exports = router