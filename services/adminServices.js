const orderModel = require("../models/order");
const pipeline = require("../pipelines/totalRevenew");
const totalOrdersPipeline = require("../pipelines/totalOrders");
const totalCustomersPipeline = require("../pipelines/totalCustomers");
const salesBySubCategoryPipeLine = require("../pipelines/salesBySubCategory");
const monthlySales = require("../pipelines/monthlySales");
const stitchTypePipeline = require("../pipelines/clothStitchType");
const fragranceTypePipeline = require("../pipelines/fragranceType");
const salesByCategoryPipeLine = require("../pipelines/salesByCategory");
const customersModel = require("../models/customers");
const productsModel = require("../models/products");
const ProductView = require('../models/ProductView');

const getAdminHomeData=async()=>{
    const pipelineOutput = await orderModel.aggregate(pipeline).exec();
        const ordersPipelineOutput = await orderModel.aggregate(totalOrdersPipeline).exec();
        const customerPipelineOutput = await customersModel.aggregate(totalCustomersPipeline).exec();
        const categorySalesPipelineOutput = await productsModel.aggregate(salesByCategoryPipeLine).exec();
        const salesBySubCategoryOutput = await productsModel.aggregate(salesBySubCategoryPipeLine).exec();
        const monthlySalesOutput = await orderModel.aggregate(monthlySales).exec();
        const stitchTypePipelineOutput = await productsModel.aggregate(stitchTypePipeline).exec();
        const fragranceTypePipelineOutput = await productsModel.aggregate(fragranceTypePipeline).exec();
        console.log(fragranceTypePipelineOutput);
        const data = {
                revenew: pipelineOutput[0].totalRevenue,
                orders: ordersPipelineOutput[0].totalOrders,
                customers: customerPipelineOutput[0].totalUser,
                salesByCategory: categorySalesPipelineOutput,
                salesBySubCategoryOutput: salesBySubCategoryOutput,
                monthlySalesOutput: monthlySalesOutput,
                stitchTypePipelineOutput: stitchTypePipelineOutput,
                fragranceTypePipelineOutput: fragranceTypePipelineOutput,
        }
        return data;
}





module.exports={
    getAdminHomeData,
    

}