// controllers/productController.js
const productsModel = require("../models/products");
const clothesModel = require("../models/clothes");
const fragranceModel = require("../models/fragrances");

exports.getProductById = async (req, res) => {
  try {
    const productId = req.params._id;

    if (productId) {
      console.log(productId);

      const product = await productsModel.findOne({ _id: productId })
        .populate({
          path: 'clothId',
          model: clothesModel,
        })
        .populate({
          path: 'fragranceId',
          model: fragranceModel,
        })
        .exec();

      if (product) {
        res.json(product);
      } else {
        res.status(404).send("Product Not Found");
      }
    } else {
      res.status(400).send("Bad request");
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).send("Internal Server Error");
  }
};
