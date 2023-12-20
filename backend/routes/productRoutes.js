import express from 'express'
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import { createProductController, deleteProductController, getProductController, getSingleProductController, productCategoryController, productCountController, productFilterController, productListController, productPhotoController, relatedProductController, updateProductController } from '../controller/productController.js';
import formidable from 'express-formidable';

const router=express.Router()

router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController)

router.put("/update-product/:pid",requireSignIn,isAdmin,formidable(),updateProductController);
  

// Get all products
router.get('/get-product',getProductController)

// single product
router.get('/get-product/:slug',getSingleProductController)

//get photo

router.get('/product-photo/:pid',productPhotoController)


//delete product
router.delete("/delete-product/:pid", deleteProductController);

// filter
router.post('/product-filters',productFilterController)


//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);
// related products
router.get('/related-product/:pid/:cid',relatedProductController)


router.get('/product-category/:slug',productCategoryController)
export default router;