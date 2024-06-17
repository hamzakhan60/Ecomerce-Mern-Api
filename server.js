const mongoose = require('mongoose');
const express = require("express");
const router = require("./Routers/login");
const UseRouter = require("./Routers/signUp");
const useHomeRouter = require("./Routers/home");
const useUserRouter = require("./Routers/user");
const useCartRouter = require("./Routers/cart");
const useProductsRouter = require("./Routers/products");
const useOrderRouter = require("./Routers/order");
const useCategoryRouter = require("./Routers/category");
const useSearchRouter = require("./Routers/search");
const useAdminRoute = require("./Routers/admin");
const { tokenDecoder1 } = require("./Controllers/jwtToken");
const useBannerRoute = require("./Routers/banner");
const { listenForCartConfirmations } = require('./services/cart');
const adminModel = require("./Modles/admin");
require('dotenv').config();

const app = express();
const { connectToDb } = require("./config/connectionDb");
const cors = require("cors");
const clothesModel = require('./Modles/clothes');

const port = process.env.PORT ;
const uri =process.env.DB_CONNECTION_STRING;
//DataBase Connection
const db = connectToDb(uri);
//views
//services
listenForCartConfirmations();



// routes
//middleware
app.use(cors({ origin: ['http://localhost:3000','https://ecomerce-mern-react.vercel.app'] }));

app.use(express.json());

app.use("/login", router);

app.use("/signUp", UseRouter);
app.use("/home", useHomeRouter);
app.use("/user", useUserRouter);
app.use("/cart", useCartRouter);
app.use("/product", useProductsRouter);
app.use("/order", useOrderRouter);
app.use("/collection", useCategoryRouter);
app.use("/search", useSearchRouter);
app.use("/admin", useAdminRoute);
app.use("/banner", useBannerRoute);








app.listen(port, () => {
    console.log("Server Connected");
})