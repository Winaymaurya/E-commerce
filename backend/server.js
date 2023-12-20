import express  from "express";
import colors from "colors"
import dotenv from "dotenv";
import mongoose from "mongoose"
import morgan from "morgan";
import cors from "cors";
//Importing routes
import authRoutes from "./routes/authRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"

const app=express();
dotenv.config()

// middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))


// Connecting database
const db= async()=>{
    try {
        await mongoose.connect(process.env.CLUSTER)
        console.log(`db is connected`);
    } catch (error) {
        console.log(`Error in mongodb${error}`);
    }
}
db();

// Routes--------------------------------


app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/category',categoryRoutes)
app.use('/api/v1/product',productRoutes)


app.get("/",(req,res)=>{
    res.send({
        message:"Welcome"
    });
});




// Port
const PORT=process.env.PORT || 8080
app.listen(PORT,()=>{
    console.log(`Server Running on ${PORT}`.bgCyan.white) 
})