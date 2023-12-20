import slugify from "slugify"
import productModel from "../models/productModel.js"
import categoryModel from "../models/categoryModel.js"
import fs from 'fs'

export const createProductController=async(req,res)=>{
    try {
        const {name,slug,description,price,category,quantity,shipping}=req.fields

        const {photo}=req.files
       
        if(!name){
            return res.status(200).send({message:"Name is required"})
        }
        if(!description){
            return res.status(200).send({message:"Description is required"})
        }
        if(!price){
            return res.status(200).send({message:"price is required"})
        }
        if(!category){
            return res.status(200).send({message:"Category is required"})
        }
        if(!quantity){
            return res.status(200).send({message:"quantity is required"})
        }
        
        
        if(!photo && photo.size<100000){
            return res.status(200).send({message:"Photo is required and less than 1mb"})
        }
        
        const products=  new productModel({...req.fields,slug:slugify(name)})
        if(photo){
            products.photo.data=fs.readFileSync(photo.path)
            products.photo.contentType=photo.type
        }
        await products.save()
        res.status(201).send({
            success:true,
            message:"New Product created",
            products
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in creating of product",
            error
        })
    }
}

// getall
export const getProductController = async (req, res) => {
    try {
      const products = await productModel.find({}).populate("category").select("-photo").limit(12).sort({ createdAt: -1 });
      res.status(200).send({
        success: true,
        countTotal: products.length,
        message: "AllProducts ",
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in getting products",
        error: error.message,
      });
    }
  };


  export const getSingleProductController=async(req,res)=>{
    try {
        const {slug}=req.params
        const product=await productModel.findOne({slug}).populate("category").select("-photo")
        res.status(200).send({
            success:true,
            message:"One product is shown",
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in getting single products",
            error
        })
    }
  }

  //photo
  export const productPhotoController=async(req,res)=>{
    try {
        const product = await productModel.findById(req.params.pid).select("photo");
        if (product.photo.data) {
          res.set("Content-type", product.photo.contentType);
          return res.status(200).send(product.photo.data);
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in getting product photo",
            error
        })
        
    }
  }


  //delete controller
export const deleteProductController = async (req, res) => {
    try {
      await productModel.findByIdAndDelete(req.params.pid).select("-photo");
      res.status(200).send({
        success: true,
        message: "Product Deleted successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error while deleting product",
        error,
      });
    }
  };
  
  //update product
  export const updateProductController = async (req, res) => {
    try {
      const { name, description, price, category, quantity, shipping } =
        req.fields;
      const { photo } = req.files;
      //alidation
      switch (true) {
        case !name:
          return res.status(500).send({ error: "Name is Required" });
        case !description:
          return res.status(500).send({ error: "Description is Required" });
        case !price:
          return res.status(500).send({ error: "Price is Required" });
        case !category:
          return res.status(500).send({ error: "Category is Required" });
        case !quantity:
          return res.status(500).send({ error: "Quantity is Required" });
        case photo && photo.size > 1000000:
          return res
            .status(500)
            .send({ error: "photo is Required and should be less then 1mb" });
      }
  
      const products = await productModel.findByIdAndUpdate(
        req.params.pid,
        { ...req.fields, slug: slugify(name) },
        { new: true }
      );
      if (photo) {
        products.photo.data = fs.readFileSync(photo.path);
        products.photo.contentType = photo.type;
      }
      await products.save();
      res.status(201).send({
        success: true,
        message: "Product Updated Successfully",
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in Updte product",
      });
    }
  };



  // filter

  export const productFilterController =async(req,res)=>{
    try {
      const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
    } catch (error) {
      console.log(error)
      res.status(500).send({
        success:false,
        message:"Something went wrong in filter",
        error
      })
    }
  }

  // product count
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

// product list base on page
export const productListController = async (req, res) => {
  try {
    const perPage = 3;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};

// similar products
export const relatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel.find({category: cid, _id: { $ne: pid }})
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while getting related product",
      error,
    });
  }
};



// get product by category
export const productCategoryController = async (req, res) => {
  try {
    const {slug}=req.params
    const category= await categoryModel.findOne({slug})

    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
    console.log(category)
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
};