import express  from "express";
import { registerController ,loginController ,testController, forgotPasswordController, updateProfileController } from "../controller/authController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";


const router=express.Router();


// routing
router.post('/register',registerController)

router.post('/login',loginController)

router.post('/forgot-password',forgotPasswordController)

//Test route

router.get('/test',requireSignIn,isAdmin,testController)

router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true});
})
// Proteed admin routes

router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true});
})

router.put('/profile',requireSignIn,updateProfileController)


router.get('/orders',)

export default router;