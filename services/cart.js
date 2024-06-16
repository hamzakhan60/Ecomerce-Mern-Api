const mongoose = require("mongoose");
const orderModel = require("../Modles/order");
const productsModel = require("../Modles/products")
const cartModel=require("../Modles/cart");
const customersModel = require("../Modles/customers");

async function listenForCartConfirmations() {
  try {
    const orderStream = orderModel.watch({fullDocument: 'updateLookup'});
    orderStream.on('change', async (change) => {
      if (change.operationType === 'insert') {

        const newOrder = change.fullDocument;
        const orders = newOrder.orders[0];
        await updateProductQuantities(orders.products);
      }
      else if (change.operationType === 'update') {
        console.log(change.fullDocument);
        const oldOrder = await orderModel.findOne({_id:change.fullDocument._id});
          const newlyInsertedItems =oldOrder.orders[oldOrder.orders.length-1]
          await updateProductQuantities(newlyInsertedItems.products);
      }
          const customer=await customersModel.findOne({orderHistory:change.fullDocument._id});
          await cartModel.findOneAndDelete({_id:customer.cart});
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
module.exports = { listenForCartConfirmations }