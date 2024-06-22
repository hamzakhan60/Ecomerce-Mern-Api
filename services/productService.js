const productsModel = require("../models/products");
const clothesModel = require("../models/clothes");
const fragranceModel = require("../models/fragrances");
const ProductView = require('../models/ProductView');

const getAllProducts=async()=>{
    try {
        const products = await ProductView.find();
        return(products);
    } catch (error) {
        throw new Error("Error Fetching Data");
    }
}
const addNewProduct=async(data)=>{
    try{
        const response=await data.save();
        return response;

    }catch(err)
    {
        throw new Error("Error Occured when saving Data");
    }
}
const findProductById=async(id)=>{
    try{
        const response= await ProductView.findById(id);
        return response;

    }catch(err){
        throw new Error("Error Fetching Data");   
    }
}

const updateProduct=async(id,updatedData)=>{
    try{
    const response= await productsModel.findByIdAndUpdate(id, updatedData, { new: true });
        return response;
    }catch(err){
        throw new Error("Error occured updating  Data");   
    }
}
const deleteProduct=async(id,type)=>{
    try{
        let response;
        if(type=="product")
            response=await productsModel.findByIdAndDelete(id);
        else if(type=="clothe")
            response=await clothesModel.findByIdAndDelete(id);
        else
            response=await fragranceModel.findByIdAndDelete(id);
        return response;
    }catch(err){
        throw new Error("Error occured deleting  Data");   
    }
}

const getProductById=async(productId)=>{
    try{
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
        return product;
    }catch(err){
        throw new Error("Err occured fetching data");
    }
}

module.exports={
    addNewProduct,
    findProductById,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getProductById
    
}
