const pipeline =
        [
                {
                        $unwind: "$orders"
                },
                {
                        $group: {
                                _id: null,
                                totalRevenue: { $sum: "$orders.GrandTotal" }
                        }
                },
                {
                $project: {
                        _id: 0, // Exclude the _id field
                        totalRevenue: 1 // Include the totalRevenue field
                      },
                }
                    
        ]
        module.exports=pipeline;