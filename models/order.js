const mongoose=require("mongoose");
const orderSchema = {
    _id: { type: mongoose.Schema.Types.ObjectId, ref:"customers"},
    orders:[{
    OrderNo: { type: String },
    ShippingDate: { type: Date },
      TotalQuantity: { type: Number },
      GrandTotal: { type: Number },
    products:[ {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Products' ,required:true},
      quantity: { type: Number, required: true },
      size: {type:String,enm:["S","L","XL","2XL"],required:true},
      color: {type:String, optional:true}
  }],
    paymentMethod: {
        type: String,
        enum: ['credit_card', 'debit_card', 'easypaisa', 'paypal','cash_on_delivery'],
        required: true
    },
 
    cardNumber: {type:String,optional:true},
    expirationDate: {type:String,optional:true}, 
    securityCode: {type:String,optional:true}, 
    transactionId: {type:String,optional:true},
    paypalEmail:{type:String,optional:true},
    

    OrderStatus: { type: String,enum: ["delivered", "received"]  }
  }]
};
  const orderModel=new mongoose.model("OrderHistory",orderSchema);
  module.exports=orderModel;