const stitchTypePipeline=  [  
    {
      "$lookup": {
        "from": "clothes",
        "localField": "clothId",
        "foreignField": "_id",
        "as": "clothData"
      }
    },
   
   
    {
      "$unwind": "$clothData"
    },
    {
      "$group": {
        "_id": "$clothData.StitchType",
        "totalSales": { "$sum": "$sales" }
      }
    },
  ]

  module.exports = stitchTypePipeline;