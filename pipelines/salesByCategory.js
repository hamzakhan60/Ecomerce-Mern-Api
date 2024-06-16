const salesByCategoryPipeLine=
[
    {
      $group: {
        _id: "$CategoryName",
        totalSales:{$sum:"$sales"}
      }
    },
  ]

  module.exports=salesByCategoryPipeLine;