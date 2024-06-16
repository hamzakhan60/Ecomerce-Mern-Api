const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: true },
  quantity: { type: Number, required: true },
  size: { type: String, enum: ["S","M", "L", "XL", "2XL"], required: true },
  color: { type: String },
  price: { type: Number, required: true }
});

const cartSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId },
  items: [cartItemSchema]
});

const cartModel = mongoose.model('Cart', cartSchema);

module.exports = cartModel;
