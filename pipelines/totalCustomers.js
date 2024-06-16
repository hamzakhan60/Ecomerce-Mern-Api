const totalCustomersPipeline =
    [
        {
            $group: {
                _id: null,
                totalUser: { $sum: 1 }
            }
        },
        {
            $project: {
                _id: 0,
                totalUser: 1
            }
        },
    ]
    module.exports=totalCustomersPipeline;