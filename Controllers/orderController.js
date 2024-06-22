const customerServices=require("../services/customerServices");
const ordersServices=require("../services/ordersServices");
const cart=require("../services/cart");
const orderModel=require("../models/order");


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


const getOrders=async(req,res)=>{
    try {
        const customer = await customerServices.getCustomerById( req.query.id );
        if (customer) {
            ordersServices.getUserOrders(customer.orderHistory)
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


}


const addNewOrder=async(req,res)=>{
    try {
        const customer =  await customerServices.getCustomerById( req.query.id );
        if (customer) {
            try {
                const cartObj = await cart.getCart( customer.cart );
                const pipelineOutput = await cart.getCartTotal(cartObj._id);
                const aggregatedData = pipelineOutput;
                console.log(aggregatedData);
                const cartData = cartObj;
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
                const orderHistory = await ordersServices.getUserOrders(customer.orderHistory );
                if (orderHistory) {
                    const updatedOrder = await ordersServices.updateOrder(orderHistory._id,newOrder);
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
                    const order = await ordersServices.addNewOrder(newOrderModel);
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


}


module.exports={
    getOrders,
    addNewOrder,
}

