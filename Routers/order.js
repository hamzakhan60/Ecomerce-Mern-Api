const express = require("express");
const mongoose = require('mongoose')
const router = express.Router();
const orderModel = require("../models/order");
const cartModel = require("../models/cart");
const customersModel = require("../models/customers");
const { tokenDecoder1 } = require("../middleware/tokenDecoder");
const { getpipeline } = require("../pipelines/cartAggregation");
const clothesModel = require("../models/clothes");
const fragranceModel = require("../models/fragrances");
const {authorizeUser}=require("../middleware/authorization");


function generateOrderNumber(orderIdLength,isDate) {
   
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let orderId = '';
  
    for (let i = 0; i < orderIdLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      orderId += characters.charAt(randomIndex);
    }
    if(isDate){
        const timestamp = Date.now().toString();
    return (timestamp + '-' + orderId);
    }
    else
        return orderId;
  
    
  }

router.use(tokenDecoder1);
router.use(authorizeUser);
router.get("/", async (req, res) => {
    
        try {
            const customer = await customersModel.findOne({ login: req.query.id });
            if (customer) {
                orderModel.findOne({ _id: customer.orderHistory }).populate({
                    path: 'orders.products.productId',
                    populate: [
                        { path: 'clothId', model: clothesModel },
                        { path: 'fragranceId', model: fragranceModel },
                    ]
                }).exec()
                    .then((d) => {
                        if (d)
                            res.send(d);
                        else
                            res.status(204).send("You have Empty Order History")
                    })
                    .catch(err => {
                        res.send("err Occured" + err);
                    })


            }
        }
        catch {
            res.send("Err Occured");
        }

   
});
router.post("/", async (req, res) => {
        try {
            const customer = await customersModel.findOne({ login: req.query.id });
            if (customer) {
                try {
                    const cartObj = await cartModel.findOne({ _id: customer.cart });
                    const pipeline = getpipeline(cartObj._id);
                    const pipelineOutput = await cartModel.aggregate(pipeline).exec();
                    const aggregatedData = pipelineOutput[0];
                    console.log(aggregatedData);
                    const cartData = await cartModel.findOne({ _id: cartObj._id }).populate({
                        path: 'items.productId',
                        populate: [
                            { path: 'clothId', model: clothesModel },
                            { path: 'fragranceId', model: fragranceModel },
                        ]
                    }).exec();
                    console.log(cartData);
                    const newOrder = {
                        OrderNo: generateOrderNumber(8,false),
                        ShippingDate: Date.now(),
                        TotalQuantity: aggregatedData.totalQuantity,
                        GrandTotal: aggregatedData.totalPrice,
                        products: cartData.items,
                        paymentMethod: req.body.paymentMethod,
                        cardNumber: req.body.cardNumber,
                        expirationDate: req.body.expirationDate,
                        securityCode: req.body.securityCode,
                        transactionId: generateOrderNumber(12,true),
                        OrderStatus: "delivered",
                    }
                    const orderHistory = await orderModel.findOne({ _id: customer.orderHistory });
                    if (orderHistory) {
                        const updatedOrder = await orderModel.findOneAndUpdate({ _id: orderHistory._id }, { $push: { orders: newOrder } }, { new: true });
                        if (updatedOrder)
                            res.send(updatedOrder)
                        else
                            res.send("Err Occured");

                    }
                    else {
                        orderSchema = {
                            _id: customer.orderHistory,
                            orders: [{
                                OrderNo: generateOrderNumber(8,false),
                                ShippingDate: Date.now(),
                                TotalQuantity: aggregatedData.totalQuantity,
                                GrandTotal: aggregatedData.totalPrice,
                                products: cartData.items,
                                paymentMethod: req.body.paymentMethod,
                                cardNumber: req.body.cardNumber,
                                expirationDate: req.body.expirationDate,
                                securityCode: req.body.securityCode,
                                transactionId: generateOrderNumber(12,false),
                                OrderStatus: "delivered",
                            }],
                        }
                        const newOrderModel = new orderModel(orderSchema);
                        const order = await newOrderModel.save();
                        res.send(order);
                    }
                }
                catch (Err) {
                    console.log("Error Occured 1" + Err);
                }


            }
            else (
                res.send("Unable to Find..")
            )
        }
        catch {
            res.send("Err Ocured");
        }

    
})
module.exports = router