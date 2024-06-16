const mongoose = require("mongoose");

 getpipeline =(id)=>{
return ([
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
            _id: "$_id",
            totalQuantity: { $sum: "$items.quantity" },
            totalPrice: { $sum: { $multiply: ["$items.quantity", "$products.Price"] } },

        }
    },
    
   
]);
}
const aggregationSchema = new mongoose.Schema({
_id: mongoose.Schema.Types.ObjectId,
totalQuantity: Number,
totalPrice: Number
}, { collection: "aggregated_view" });


const aggregated_view= mongoose.model('aggregated_view', aggregationSchema);
module.exports={
    getpipeline,
    aggregated_view,
};