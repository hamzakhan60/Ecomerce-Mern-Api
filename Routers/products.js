const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();
const { tokenDecoder1 } = require("../middleware/tokenDecoder");
const productsModel = require("../models/products");
const clothesModel = require("../models/clothes");
const fragranceModel = require("../models/fragrances");
const { authorizeAdmin } = require("../middleware/authorization");
const productController = require('../Controllers/productController');


router.put("/:id", authorizeAdmin, tokenDecoder1, async (req, res) => {
    const updateData = req.body;
    if (req.body.CategoryName == "Clothe") {
        clotheData = updateData.clothId;
        const updateClothe = await clothesModel.findOneAndUpdate({ _id: clotheData._id }, clotheData, { new: true });

    }
    else {
        fragranceData = updateData.fragranceId;
        const updateFragranceData = await fragranceModel.findOneAndUpdate({ _id: clotheData._id }, fragranceData, { new: true });
    }

    const data = await productsModel.findOneAndUpdate({ _id: updateData._id }, updateData, { new: true });
    if (data)
        res.status(200).send(data);
    else
        res.status(409).send("product did not updated");
});
router.post("/", authorizeAdmin, tokenDecoder1, async (req, res) => {
    console.log(req.body);
    if (req.body.CategoryName == "Clothe") {

        const Clothe = {
            Description: req.body.Description,
            SubCategory: req.body.SubCategory,
            StitchType: req.body.StitchType,
            Size: req.body.Size, // Array of sizes (e.g., ["S", "M", "L"])
            Color: req.body.Color, // Array of colors
            Material: req.body.Material,
            imgUrl: req.body.imgUrl,
        };
        const newClothe = new clothesModel(Clothe);
        const clotheResult = await newClothe.save();
        if (clotheResult) {
            const Product = {
                ProductName: req.body.ProductName,
                CategoryName: req.body.CategoryName,
                clothId: clotheResult._id,

                Stock: req.body.Stock,
                Price: req.body.Price,
                sales: 0,
            }
            const newProduct = new productsModel(Product);
            const result = await newProduct.save();
            if (result)
                res.status(200).send(result);
            else
                res.status(500).send("Err Occured");
        }
        else {
            res.status(500).send("Err Occured");
        }
    }
    else {
        const fragrance = {
            Description: req.body.Description,
            SubCategory: req.body.SubCategory,
            family: req.body.family,
            Size: req.body.Size, // Array of sizes (e.g., ["S", "M", "L"])
            Material: req.body.Material,
            imgUrl: req.body.imgUrl,
        }
        const newFragrance = new fragranceModel(fragrance);
        const fragranceResult = await newFragrance.save();
        console.log(fragranceResult._id);
        if (fragranceResult) {
            const Product = {
                ProductName: req.body.ProductName,
                CategoryName: req.body.CategoryName,
                fragranceId: fragranceResult._id,


                Stock: req.body.Stock,
                Price: req.body.Price,
                sales: 0,
            }
            const newProduct = await productsModel(Product);
            const result = await newProduct.save();
            if (result)
                res.status(200).send(result);
            else
                res.status(500).send("Err Occured");
        }
        else
            res.status(500).send("Err Occured");
    }
});
router.get("/:_id", productController.getProductById);
router.delete("/:id", authorizeAdmin, tokenDecoder1, async (req, res) => {
    if (req.body.CategoryName == "Clothe")
        clothesModel.findOneAndDelete({ _id: req.body.clothId });
    else
        fragranceModel.findOneAndDelete({ _id: req.body.fragranceId });


    const data = await productsModel.findOneAndDelete({ _id: req.body._id });
    if (data)
        res.status(200).send("Data Deleted Successfully");
    else
        res.status(500).send("Err Occured");

})
module.exports = router
