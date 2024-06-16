const mongoose = require('mongoose');

const customerViewSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  address: {
    streetName: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    pinCode: { type: String, required: true }
  },
  cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
  orderHistory: { type: mongoose.Schema.Types.ObjectId, ref: 'OrderHistory' },
  loginDetails: {
    _id: mongoose.Schema.Types.ObjectId,
    email: String,
    password: String,
    // Add any other fields from the Login schema that you want to include
  }
}, { collection: 'CustomerView' });

const customerViewModel = mongoose.model('CustomerView', customerViewSchema);
module.exports = customerViewModel;
