import categoryModel from "../models/categoryModel.js"
import slugify from "slugify"

export const createCategoryController=async(req,res)=>{
      try {   
        const {name}=req.body  
        if(!name){
            return res.status(401).send({message:"Category name is required" })
        }
   const existingCategory=await categoryModel.findOne({name})

   if(existingCategory){
       return res.status(200).send({
        success:false,
        message:"Category Already exists",
       })
   }
   const category=await new categoryModel({name,slug:slugify(name)}).save();
   console.log(category)
   res.status(201).send({
    success:true,
    message:"Category Created",
    category,
   })
      } catch (error) {
          console.log(error)
          res.status(404).send({
            success:false,
            message:"Something went wrong in category",
            error
          })
      }
}


// Update -Category
export const updateCategoryController=async(req,res)=>{
    try {
        const {name}=req.body
        const {id}=req.params

        const category=await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})

        res.status(200).send({
            success:true,
            message:"Category Updated Successfully",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(404).send({
            success:false,
            message:"Something went wrong in Updating",
            error
        })
    }
}


// show Catgory

export const categoryController =async(req,res)=>{
    try {
        const category=await categoryModel.find({})
        res.status(200).send({
            success:true,
            message:"All category shown",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(404).send({
            success:false,
            message:"Something went wrong ",
            error
        })
    }
}

export const singleCategoryController=async(req,res)=>{
    try {
        const {slug}=req.params
        const singleCategory= await categoryModel.findOne({slug})
        res.status(200).send({
            success:true,
            message:"Single Category Shown",
            singleCategory
            
        })
   

    } catch (error) {
        console.log(error)
        res.status(404).send({
            success:false,
            message:"Something went wrong",
            error
        })
    }
}

// delete category

export const deleteCategoryController=async(req,res)=>{
    try {
        const {id}=req.params
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:"Category Deleted successfully"
        })
    } catch (error) {
      console.log(error)   
      res.status(404).send({
        success:false,
        message:"Error in deletion",
        error
      })
    }
}