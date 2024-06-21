const mongoose =require("mongoose");


const categoryImageSchema={
    image: {
        type:String
    }
}
const categoryImageModel=mongoose.model("categoryImages",categoryImageSchema);


module.exports= categoryImageModel;