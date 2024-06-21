// models/ProductView.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productViewSchema = new Schema({
  ProductName: { type: String },
  CategoryName: { type: String },
  Stock: { type: Number },
  Price: { type: Number },
  sales: { type: Number },
  Description: { type: String },
  SubCategory: { type: String },
  StitchType: { type: String },
  Size: [String],
  Color: [String],
  Material: { type: String },
  imgUrl: { type: String },
  type: { type: String },
  family: { type: String }
}, { collection: 'ProductView' }); // Name of the view in MongoDB

const ProductView = mongoose.model('ProductView', productViewSchema);

module.exports = ProductView;
