const salesBySubCategoryPipeLine=
[
    {
      $match: {
        $or: [
          { "clothId": { "$exists": true } },
          { "fragranceId": { "$exists": true } }
        ]
      }
    },
    {
      "$lookup": {
        "from": "clothes",
        "localField": "clothId",
        "foreignField": "_id",
        "as": "clothData"
      }
    },
    {
      "$lookup": {
        "from": "fragrances",
        "localField": "fragranceId",
        "foreignField": "_id",
        "as": "fragranceData"
      }
    },
    {
      "$addFields": {
        "productData": { "$concatArrays": ["$clothData", "$fragranceData"] }
      }
    },
    {
      "$unwind": "$productData"
    },
    {
      "$group": {
        "_id": "$productData.SubCategory",
        "totalSales": { "$sum": "$sales" }
      }
    }
  ]
  
  module.exports = salesBySubCategoryPipeLine;
  