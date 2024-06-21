const mongoose = require("mongoose");
const orderModel = require("../models/order");
const productsModel = require("../models/products")
const cartModel = require("../models/cart");
const customersModel = require("../models/customers");
const clothesModel = require("../models/clothes");
const fragranceModel = require("../models/fragrances");
const {getpipeline} =require("../pipelines/cartProductPrice");

async function listenForCartConfirmations() {
  try {
    const orderStream = orderModel.watch({ fullDocument: 'updateLookup' });
    orderStream.on('change', async (change) => {
      if (change.operationType === 'insert') {

        const newOrder = change.fullDocument;
        const orders = newOrder.orders[0];
        await updateProductQuantities(orders.products);
      }
      else if (change.operationType === 'update') {
        console.log(change.fullDocument);
        const oldOrder = await orderModel.findOne({ _id: change.fullDocument._id });
        const newlyInsertedItems = oldOrder.orders[oldOrder.orders.length - 1]
        await updateProductQuantities(newlyInsertedItems.products);
      }
      const customer = await customersModel.findOne({ orderHistory: change.fullDocument._id });
      await cartModel.findOneAndDelete({ _id: customer.cart });
    });


    console.log('Listening for order confirmations...');
  } catch (error) {
    console.error(error);

  }
}
async function updateProductQuantities(cartItems) {
  for (const item of cartItems) {
    console.log("cart items" + cartItems);
    const product = await productsModel.findOne({ _id: item.productId });
    if (product.Stock > item.quantity) {
      const updatedData = {
        Stock: product.Stock - item.quantity,
        sales: product.sales + item.quantity,
      }
      console.log(updatedData);
      const update = await productsModel.findOneAndUpdate({ _id: product._id }, updatedData, { new: true });
      if (update)
        console.log("product data updated Successfuly")
      else
        console.log("err Occured to update product data ");
    } else {

      console.error(`Insufficient stock for product ${product.name}`);
    }
  }

}


const getCart = async (cartId) => {
  try {
    const cartData = await cartModel.findOne({ _id: cartId }).populate({
      path: 'items.productId',
      populate: [
        { path: 'clothId', model: clothesModel },
        { path: 'fragranceId', model: fragranceModel },
      ]
    }).exec();
    return cartData;
  } catch (err) {
    throw new Error("Error Occured Fetching cart Data")
  }
}


const getCartTotal=async(cartId)=>{
  const pipeline=getpipeline(cartId);
  const pipelineOutput = await cartModel.aggregate(pipeline).exec();
  console.log(pipelineOutput[0].totalPrice);
  return pipelineOutput[0].totalPrice;
}
module.exports = { listenForCartConfirmations,
  getCart,
  getCartTotal,
 }