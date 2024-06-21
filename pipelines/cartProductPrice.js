
const mongoose = require("mongoose");

const getpipeline=(id)=>{
  return ( [
        {
            $match: {
              _id: new mongoose.Types.ObjectId(id),
            }
          },
         
      {
           $unwind: "$items"
       },
       {
           $lookup: {
               from: "products",
               localField: "items.productId",
               foreignField: "_id",
               as: "products"
           }
       },
       {
           $unwind: "$products"
       },
      {
           $group: {
               _id: "_id",
               totalPrice: { $sum: { $multiply: ["$items.quantity", "$products.Price"] } },
   
           }
       },
     ]);
}
const aggregationSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    totalPrice: Number
    }, { collection: "aggregatedCartPrice" });
    
    
    const aggregatedCartPrice= mongoose.model('aggregatedCartPrice', aggregationSchema);
    module.exports={
        getpipeline,
        aggregatedCartPrice,
    };