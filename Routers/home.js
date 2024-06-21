const express=require("express");
const mongoose=require('mongoose');
const router=express.Router();
const loginModel=require("../models/login");
const bannerModel=require("../models/banner");
const categoryImageModel=require("../models/categoryImage");
const productsModel=require("../models/products");
const clothesModel=require("../models/clothes")
const fragranceModel=require("../models/fragrances");

router.get("/",async (req,res)=>{
  

        loginModel.findOne({email:req.query.email})
        .then((d)=>{
            
                async function homeData(){
                const banner=await bannerModel.find({});
                const categoryImages=await categoryImageModel.find({});
                const products=await productsModel.find({Stock:{$lte:80}}).populate({
                    path: 'clothId', 
                    model: clothesModel 
                  })
                  .populate({
                    path: 'fragranceId', 
                    model: fragranceModel 
                  }).exec();
                 const fragance=await productsModel.find()
                  .populate({
                    path: 'fragranceId', 
                    model: fragranceModel 
                  }).exec();
                const response={
                    banner:banner,
                    categoryImages:categoryImages,
                    products:products,
                    fragance:fragance,

                }
                res.send(response);
                }
                homeData();

           
        })
        .catch((err)=>{
            console.log("Error Occured");
        })

        
});

module.exports=router;