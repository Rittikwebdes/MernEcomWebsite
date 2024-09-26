import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "express"
import cors from "cors"
import userRoute from "./Routes/user.route.js"
import productRoute from "./Routes/product.route.js"
import cartRoute from "./Routes/cart.route.js"
import addressRoute from "./Routes/address.route.js"
import payRoute from "./Routes/Payment.route.js"
const app = express();

app.use(bodyParser.json())
dotenv.config();
const port = process.env.PORT
const mongourl = process.env.MONGO_URI
export const secretKey = process.env.JWT_SECRET_KEY
app.use(cors({
    origin:process.env.FRONTEND_URL,
    methods:["GET","POST","DELETE","UPDATE"],
    credentials:true
}))

//mongodb connection
try {
    mongoose.connect(mongourl)
    console.log("mongodb connected")
} catch (error) {
    console.log(error)
}

//Testing Routes
app.get("/",(req,res)=>
res.status(200).json({message:"this is home route"})
)
//Project Routes
app.use("/api/user",userRoute)
app.use("/api/product",productRoute)
app.use("/api/cart",cartRoute)
app.use("/api/address",addressRoute)
app.use("/api/payment",payRoute)

app.listen(port,()=>{
    console.log(`server is running at port ${port}`)
})