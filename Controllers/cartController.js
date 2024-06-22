const cartModel = require("../models/cart");
const customersModel = require("../models/customers");
const clothesModel = require("../models/clothes");
const fragranceModel = require("../models/fragrances");
const productsModel = require("../models/products");
const {getpipeline} =require("../pipelines/cartProductPrice");
const customerServices=require("../services/customerServices");
const cart=require("../services/cart");
const productService=require("../services/productService");

const getCart=async(req,res)=>{
    try {
        const customerDetail = await customerServices.getCustomerById(req.query.id);
        const cartData = await cart.getCart(customerDetail.cart);
        const cartTotal=await cart.getCartTotal(cartData._id);
       
        console.log("hi"+cartData);
        if (cartData){
        const responseObj={
            cartData:cartData,
            subTotal:cartTotal,
        }
        console.log(responseObj);
            res.status(200).send(responseObj)}
        else
            res.status(204).send("Your Cart is Empty");
    }
    catch {
        res.status(500).send("Error Occured");
    }

}
const updateCart=async(req,res)=>{
    console.log(req.body);
    console.log(req.query)
    const data = {
        quantity: req.body.quantity,
        size: req.body.size,
        color: req.body.color,
        productId:req.body.productId,
    }

    const CustomerCartId = await customerServices.getCustomerById(req.query.id);

    const update=await cart.cartUpdate(CustomerCartId.cart,req.body.itemsId,data);
    console.log("ok"+update);
    
    const pipelineOutput = await cart.getCartTotal(CustomerCartId.cart);

    console.log(pipelineOutput);
    if (update){
        const responseObj={
            cartData:update,
            subTotal:pipelineOutput,
        }
        res.status(200).send(responseObj);
    }
    else
        res.status(400).send("Err Occured");


}

const addIntoCart=async(req,res)=>{
    console.log("Request body:", req.body);
    console.log("Request query:", req.query);
    try {
        const product = await productService.findProductById( req.body.productId );
        if (!product) {
          console.log("Product not found:", req.body.productId);
          return res.status(404).send("Product not found");
        }
    
        const customer = await customerServices.getCustomerById(req.query.id);
        if (!customer) {
          console.log("Customer not found:", req.query.id);
          return res.status(404).send("Customer not found");
        }
    
        const cartData = await cart.getCart( customer.cart );
        if (cartData) {
          let itemUpdated = false;
          for (const item of cartData.items) {
            if (item.size === req.body.size && item.color === req.body.color && item.productId.toString() === req.body.productId) {
              item.quantity += req.body.quantity;
              item.price = product.Price * item.quantity; // Update price accordingly
              itemUpdated = true;
              break;
            }
          }
    
          if (itemUpdated) {
            const updatedCart=await cart.cartUpdate(customer.cart,cart._id,cartData)
            console.log("Cart updated with existing item:", updatedCart);
            return res.status(200).send(updatedCart);
          } else {
            const newCartProduct = {
              productId: req.body.productId,
              quantity: req.body.quantity,
              size: req.body.size,
              color: req.body.color,
              price: product.Price * req.body.quantity,
            };
    
            console.log("Adding new product to cart:", newCartProduct);
            cartData.items.push(newCartProduct);
            const updatedCart = await cart.addProductInCart(cartData);
            console.log("Cart updated with new item:", updatedCart);
            return res.status(200).send(updatedCart);
          }
        } else {
          const newCart = {
            _id: customer.cart,
            items: [{
              productId: req.body.productId,
              quantity: req.body.quantity,
              size: req.body.size,
              color: req.body.color,
              price: product.Price * req.body.quantity,
            }],
          };
    
          console.log("Creating new cart:", newCart);
          const data = new cartModel(newCart);
          const result = await cart.addProductInCart(data);
          console.log("New cart created:", result);
          return res.status(200).send(result);
        }
      } catch (err) {
        console.error("Internal server error:", err);
        return res.status(500).send("Internal Server Error");
      }
}
const deleteProductFromCart=async(req,res)=>{
    console.log(req.query.itemsId );
    console.log(req.query.id );
    const customerDetail = await customerServices.getCustomerById(req.query.id);
    const result = await cart.deleteFromCart(customerDetail.cart,req.query.itemsId);
        let subTotal;
        if(result.items.length>0){
        const pipelineOutput = await cart.getCartTotal(result._id);
        subTotal=pipelineOutput;
        }
        else
            subTotal=0;
        console.log(result);
    if (result){

    const responseObj={
        cartData:result,
        subTotal:subTotal,
    }

        res.status(200).send(responseObj)}
    else
        res.status(404).send("Err Occured")


}
module.exports={
    getCart,
    updateCart,
    addIntoCart,
    deleteProductFromCart
}