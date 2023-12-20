import mongoose from "mongoose";

const userSchema=mongoose.Schema({
         name:{
            type:String,
            required:true,
            trim:true
         },
         email:{
            type:String,
            unique:true,
            required:true
         },
         password:{
            type:String,
            required:true
         },
         phone:{
            type:String,
            required:true
         },
         address:{
            type:String,
            required:true
         },
         answer:{
            type:String,
            required:true
         },
         role:{
            type:Number,
            default:0
         }
},{timeStamp:true})
export default mongoose.model('users',userSchema)