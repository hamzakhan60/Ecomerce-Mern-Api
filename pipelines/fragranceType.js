const fragranceType=  [  
    {
      "$lookup": {
        "from": "fragrance",
        "localField": "fragranceId",
        "foreignField": "_id",
        "as": "fragranceData"
      }
    },
   
   
    {
      "$unwind": "$fragranceData"
    },
    {
      "$group": {
        "_id": "$fragranceData.type",
        "totalSales": { "$sum": "$sales" }
      }
    },
  ]
  module.exports=fragranceType;