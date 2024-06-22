const orderModel = require("../models/order");
const clothesModel = require("../models/clothes");
const fragranceModel = require("../models/fragrances");
const customersModel = require("../models/customers");
const loginModel=require("../models/login");
const productsModel = require("../models/products");





const getAllOrders=async()=>{
    try{
         const orders=await orderModel.find().populate({
            path: 'orders.products.productId',
            populate: [
                { path: 'clothId', model: clothesModel },
                { path: 'fragranceId', model: fragranceModel }
            ]
        }).exec();
        if (!orders.length) {
            return 
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
        return data;

    }catch(err){
        throw new Error("Error occured fetching orders Data");   
    }

}

const getUserOrders=async(orderId)=>{
    try{
        const response=orderModel.findOne({ _id: orderId }).populate({
            path: 'orders.products.productId',
            populate: [
                { path: 'clothId', model: clothesModel },
                { path: 'fragranceId', model: fragranceModel },
            ]
        }).exec();
        return response;
    }catch(err){
        throw new Error("Error Occured Fetching Orders");
    }  
}

const updateOrder=async(orderId,newOrder)=>{
    try{
        const response=await orderModel.findOneAndUpdate({ _id: orderId }, { $push: { orders: newOrder } }, { new: true });
        return response;

    }catch(err){
        throw new Error("Err occured while Updating Order");
    }
}
const addNewOrder=async(order)=>{
    try{
        const response = order.save();
        return response;

    }catch(err){
        throw new Error("Err occured adding new Order");
    }
}
module.exports={
    getAllOrders,
    getUserOrders,
    addNewOrder,
    updateOrder
}