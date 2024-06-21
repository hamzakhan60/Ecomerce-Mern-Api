
const mongoose = require("mongoose");

const clothesSchema = {
    Description: { type: String },
    SubCategory: {
        type: String, enum: ["ForMen","ForWomen", "Kids"]// Subcategory within the main category (e.g., "ForWomen", "ForMen", "Kids", "Men", "Women")
    },
    StitchType: { type: String, enum: ["Stich", "Unstich","WAISTCOAT"] }, 
    Size: [String], // Array of sizes (e.g., ["S", "M", "L"])
    Color: [String], // Array of colors
    Material: { type: String },
    imgUrl: { type: String },
}

const clothesModel = mongoose.model('clothes', clothesSchema);

module.exports = clothesModel;