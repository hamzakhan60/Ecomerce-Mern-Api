const monthlySales= [
    {
      $unwind: "$orders"
    },
    {
      $group: {
        _id: {
          year: { $year: "$orders.ShippingDate" },
          month: { $month: "$orders.ShippingDate" }
        },
        orderCount: { $sum: 1 }
      }
    },
    {
      $project: {
        _id: 0,
        year: "$_id.year",
        month: "$_id.month",
        orderCount: 1
      }
    },
    {
      $sort: { year: 1, month: 1 }
    }
  ]
  module.exports=monthlySales;

