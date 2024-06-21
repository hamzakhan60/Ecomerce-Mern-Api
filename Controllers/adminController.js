const productsModel = require("../models/products");
const clothesModel = require("../models/clothes");
const fragranceModel = require("../models/fragrances");
const adminServices =require("../services/adminServices");
const productService =require("../services/productService");
const ordersServices=require("../services/ordersServices");
const customerServices=require("../services/customerServices");

const adminHomeData=async(req,res)=>{

    try{
    const data= await adminServices.getAdminHomeData();
    res.status(200).send(data);
    }catch(err){
        res.status(500).send("Error fetching data");
    }

}

const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const addNewProduct = async (req,res) => {
    try {
        let newProductData = {
            ProductName: req.body.ProductName,
            CategoryName: req.body.CategoryName,
            Stock: req.body.Stock,
            Price: req.body.Price,
        };

        if (req.body.CategoryName === 'Clothe') {
            const newCloth = new clothesModel({
                Description: req.body.Description,
                SubCategory: req.body.SubCategory,
                StitchType: req.body.StichType,
                Size: req.body.Size,
                Color: req.body.Color,
                Material: req.body.Material,
                imgUrl: req.body.imgUrl,
            });
            const savedCloth = await productService.addNewProduct(newCloth) ;
            console.log(savedCloth);
            newProductData.clothId = savedCloth._id;
        } else if (req.body.CategoryName === 'Fragrance') {
            const newFragrance = new fragranceModel({
                Description: req.body.Description,
                SubCategory: req.body.SubCategory,
                type: req.body.type,
                family: req.body.family,
                Size: req.body.Size,
                Material: req.body.Material,
                imgUrl: req.body.imgUrl,
            });
            const savedFragrance = await productService.addNewProduct(newFragrance);
            newProductData.fragranceId = savedFragrance._id;
        } else {
            return res.status(400).json({ message: 'Invalid category name' });
        }

        const newProduct = new productsModel(newProductData);
       const response= await productService.addNewProduct(newProduct);

        const data = await productService.findProductById(response._id);
        res.status(201).json(data);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }


}
const updateProduct=async(req,res)=>{
    const { id } = req.params;
        const updatedData = req.body;
        console.log("hi");
        

        try {
                const updatedProduct = await productService.updateProduct(id,updatedData)
                if (!updatedProduct) {
                        return res.status(404).json({ message: 'Product not found' });
                }
                res.json(updatedProduct);
        } catch (error) {
                res.status(400).json({ message: error.message });
        }

}
const deleteProduct=async(req,res)=>{
    try {
        const productId = req.params.productId;

        // Check if the productId is provided
        if (!productId) {
                return res.status(400).json({ message: 'Product ID is required' });
        }

        // Find the product by ID
        const product = await productService.findProductById(productId);

        // Check if the product exists
        if (!product) {
                return res.status(404).json({ message: 'Product not found' });
        }

        // Delete the product from the main products collection
        const response =await productService.deleteProduct(productId,"product");

        // Check if the product has a subtype (clothId or fragranceId) and delete it from the respective collections
        if (product.CategoryName === 'Clothe' && product.clothId) {
                await productService.deleteProduct(product.clothId);
        } else if (product.CategoryName === 'Fragrance' && product.fragranceId) {
                await productService.deleteProduct(product.fragranceId);
        }

        // Return success message
        res.status(200).json({ message: 'Product and subtype deleted successfully' });
} catch (error) {
        // Handle any errors that occur during the process
        res.status(400).json({ message: error.message });
}
}
const getAllOrders=async(req,res)=>{
    try {
        // Fetch orders with populated products
        const data = await ordersServices.getAllOrders();

        if (!data) {
            return res.status(204).send("You have Empty Order History");
        }

        
        res.json(data);
    } catch (err) {
        res.status(500).send("Error occurred: " + err.message);
    }
}
const getAllCustomers=async(req,res)=>{
    try {
        const customersData = await customerServices.getAllCustomer();
        res.json(customersData);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
}

module.exports = {
    adminHomeData,
    getAllProducts,
    addNewProduct,
    updateProduct,
    deleteProduct,
    getAllOrders,
    getAllCustomers
}