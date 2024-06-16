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
const customersModel=mongoose.model("Customers",customersSchema);
module.exports=customersModel;