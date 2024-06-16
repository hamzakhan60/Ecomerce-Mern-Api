
const mongoose =require("mongoose");

const productSchema ={
    ProductName: { type: String, required: true },
    CategoryName:{type:String,enum: ["Clothe","Fragrance"]},
   
     clothId:{type: mongoose.Schema.Types.ObjectId, ref:"clothes" },
     fragranceId:{type: mongoose.Schema.Types.ObjectId ,ref:"fragrnace"},
    
    Stock: { type: Number, required: true },
    Price: { type: Number, required: true },
    sales:{type:Number, default:0},
  }
  const productsModel=mongoose.model('Products', productSchema);
  
  module.exports = productsModel;