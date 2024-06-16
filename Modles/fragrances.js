
const mongoose = require ("mongoose");

const fragranceSchema = {
    Description: { type: String },
    SubCategory: {
        type: String, enum: ["ForMen","ForWomen","kids",]// Subcategory within the main category (e.g., "ForWomen", "ForMen", "Kids", "Men", "Women")
    },
    type:{type:String,enum:["atar","perfume"]},
    family:{type:String},
    Size: [String], // Array of sizes (e.g., ["S", "M", "L"])
    Material: { type: String },
    imgUrl: { type: String },
}

const fragranceModel = mongoose.model('fragrances', fragranceSchema);

module.exports = fragranceModel;