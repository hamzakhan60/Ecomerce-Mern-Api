const mongoose=require("mongoose");
const categorySalesSchema = new mongoose.Schema({
    _id: {
      type: String,
      required: true
    },
    totalSales: {
      type: Number,
      required: true
    }
  }, { collection: 'salesByCategory' }); 
  const CategorySales = mongoose.model('salesByCategory', categorySalesSchema);

  module.exports = CategorySales;