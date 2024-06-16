const mongoose=require("mongoose");





const customersSchema={
    firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  phoneNumber: { type: String, required: true, unique: true }, // Ensure unique phone number
  age: { type: Number, virtual: true }, // Calculated from dateOfBirth (optional)

  // Address (embedded document)
  address: {
    streetName: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    pinCode: { type: String, required: true }
  },
  cart:{ type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
  orderHistory:{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderHistory' },
  login:{ type: mongoose.Schema.Types.ObjectId, ref: 'Login' },
}
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
const userOrdersViewSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    customer: customersSchema,
    orderDetails: [orderSchema]
  },{ collection: 'OrdersView' });
  
  const UserOrdersView = mongoose.model('OrdersView', userOrdersViewSchema);
  module.exports=UserOrdersView;