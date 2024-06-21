const mongoose =require("mongoose");


const bannerSchema={
    image: {
        type:String
    }
}
const bannerModel=mongoose.model("banners",bannerSchema);


module.exports= bannerModel;
