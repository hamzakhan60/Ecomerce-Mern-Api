const totalOrdersPipeline=
    [
        {
          $unwind: "$orders" 
        },
        {
          $group: {
            _id: null,
            totalOrders:{$sum:1}
          }
        },
        {
            $project: {
                    _id: 0, // Exclude the _id field
                    totalOrders: 1 // Include the totalRevenue field
                  },
            }
        
        
      ]
module.exports=totalOrdersPipeline;