const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();
const { tokenDecoder1 } = require("../Controllers/jwtToken");
const { authorizeAdmin } = require("../Middleware/authorization");
const orderModel = require("../Modles/order");
const pipeline = require("../pipelines/totalRevenew");
const totalOrdersPipeline = require("../pipelines/totalOrders");
const totalCustomersPipeline = require("../pipelines/totalCustomers");
const customersModel = require("../Modles/customers");
const salesByCategoryPipeLine = require("../pipelines/salesByCategory");
const productsModel = require("../Modles/products");
const CategorySales = require("../Modles/salesByCategory");
const salesBySubCategoryPipeLine = require("../pipelines/salesBySubCategory");
const monthlySales = require("../pipelines/monthlySales");
const stitchTypePipeline = require("../pipelines/clothStitchType");
const fragranceTypePipeline = require("../pipelines/fragranceType");
const ProductView = require('../Modles/ProductView');
const clothesModel = require("../Modles/clothes");
const fragranceModel = require("../Modles/fragrances");
const customerViewModel=require("../Modles/CustomerView");

const loginModel=require("../Modles/login");





router.use(tokenDecoder1);
router.use(authorizeAdmin);

router.get("/home", async (req, res) => {

        const pipelineOutput = await orderModel.aggregate(pipeline).exec();
        const ordersPipelineOutput = await orderModel.aggregate(totalOrdersPipeline).exec();
        const customerPipelineOutput = await customersModel.aggregate(totalCustomersPipeline).exec();
        const categorySalesPipelineOutput = await productsModel.aggregate(salesByCategoryPipeLine).exec();
        const salesBySubCategoryOutput = await productsModel.aggregate(salesBySubCategoryPipeLine).exec();
        const monthlySalesOutput = await orderModel.aggregate(monthlySales).exec();
        const stitchTypePipelineOutput = await productsModel.aggregate(stitchTypePipeline).exec();
        const fragranceTypePipelineOutput = await productsModel.aggregate(fragranceTypePipeline).exec();
        console.log(fragranceTypePipelineOutput);
        const data = {
                revenew: pipelineOutput[0].totalRevenue,
                orders: ordersPipelineOutput[0].totalOrders,
                customers: customerPipelineOutput[0].totalUser,
                salesByCategory: categorySalesPipelineOutput,
                salesBySubCategoryOutput: salesBySubCategoryOutput,
                monthlySalesOutput: monthlySalesOutput,
                stitchTypePipelineOutput: stitchTypePipelineOutput,
                fragranceTypePipelineOutput: fragranceTypePipelineOutput,
        }
        res.send(data);





})



// GET request to fetch all products from the view
router.get('/products', async (req, res) => {
        try {
                const products = await ProductView.find();
                res.json(products);
        } catch (error) {
                res.status(500).json({ message: error.message });
        }
});

// POST request to add a new product
router.post('/products', async (req, res) => {
        try {
                let newProductData = {
                        ProductName: req.body.ProductName,
                        CategoryName: req.body.CategoryName,
                        Stock: req.body.Stock,
                        Price: req.body.Price,
                };

                if (req.body.CategoryName === 'Clothe') {
                        const newCloth = new clothesModel({
                                Description: req.body.Description,
                                SubCategory: req.body.SubCategory,
                                StitchType: req.body.StichType,
                                Size: req.body.Size,
                                Color: req.body.Color,
                                Material: req.body.Material,
                                imgUrl: req.body.imgUrl,
                        });
                        const savedCloth = await newCloth.save();
                        console.log(savedCloth);
                        newProductData.clothId = savedCloth._id;
                } else if (req.body.CategoryName === 'Fragrance') {
                        const newFragrance = new fragranceModel({
                                Description: req.body.Description,
                                SubCategory: req.body.SubCategory,
                                type: req.body.type,
                                family: req.body.family,
                                Size: req.body.Size,
                                Material: req.body.Material,
                                imgUrl: req.body.imgUrl,
                        });
                        const savedFragrance = await newFragrance.save();
                        newProductData.fragranceId = savedFragrance._id;
                } else {
                        return res.status(400).json({ message: 'Invalid category name' });
                }

                const newProduct = new productsModel(newProductData);
                await newProduct.save();

                const data = await ProductView.findOne({ _id: newProduct._id });
                res.status(201).json(data);
        } catch (error) {
                res.status(400).json({ message: error.message });
        }
});

// PUT request to update a product
router.put('/products/:id', async (req, res) => {
        const { id } = req.params;
        const updatedData = req.body;
        console.log("hi");
        

        try {
                const updatedProduct = await productsModel.findByIdAndUpdate(id, updatedData, { new: true });
                if (!updatedProduct) {
                        return res.status(404).json({ message: 'Product not found' });
                }
                res.json(updatedProduct);
        } catch (error) {
                res.status(400).json({ message: error.message });
        }
});
router.delete('/products/:productId', async (req, res) => {
        try {
                const productId = req.params.productId;

                // Check if the productId is provided
                if (!productId) {
                        return res.status(400).json({ message: 'Product ID is required' });
                }

                // Find the product by ID
                const product = await productsModel.findById(productId);

                // Check if the product exists
                if (!product) {
                        return res.status(404).json({ message: 'Product not found' });
                }

                // Delete the product from the main products collection
                await productsModel.findByIdAndDelete(productId);

                // Check if the product has a subtype (clothId or fragranceId) and delete it from the respective collections
                if (product.CategoryName === 'Clothe' && product.clothId) {
                        await clothesModel.findByIdAndDelete(product.clothId);
                } else if (product.CategoryName === 'Fragrance' && product.fragranceId) {
                        await fragranceModel.findByIdAndDelete(product.fragranceId);
                }

                // Return success message
                res.status(200).json({ message: 'Product and subtype deleted successfully' });
        } catch (error) {
                // Handle any errors that occur during the process
                res.status(400).json({ message: error.message });
        }
});

router.get('/orders', async (req, res) => {
        try {
                // Fetch orders with populated products
                const orders = await orderModel.find().populate({
                    path: 'orders.products.productId',
                    populate: [
                        { path: 'clothId', model: clothesModel },
                        { path: 'fragranceId', model: fragranceModel }
                    ]
                }).exec();
        
                if (!orders.length) {
                    return res.status(204).send("You have Empty Order History");
                }
        
                // Fetch customer details for each order
                const customerDetailsPromises = orders.map(order => 
                    customersModel.findOne({orderHistory:order._id}).populate({
                        path: 'login',
                        model: loginModel
                    }).exec()
                );
        
                const customerDetails = await Promise.all(customerDetailsPromises);
        
                // Combine orders and customer details into a single response object
                const data = orders.map((order, index) => ({
                    order,
                    customerDetail: customerDetails[index]
                }));
        
                res.json(data);
            } catch (err) {
                res.status(500).send("Error occurred: " + err.message);
            }
        });

router.get("/customers",async(req,res)=>{
        try {
                const customerView = await customerViewModel.find().exec();
                res.json(customerView);
              } catch (err) {
                res.status(500).json({ error: err.message });
              }
        
})
        



module.exports = router