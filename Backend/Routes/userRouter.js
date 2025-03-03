const express = require("express")
const router = express.Router()
const {body} = require("express-validator")
const {registerUser,loginUser,getUserProfile,logoutuser} = require("../Controllers/userController")
const {authUser} = require("../Middlewares/authMiddleware")

router.post("/register",[
    body("fullName.firstName").isLength({min:3}).withMessage("First Name must be contain atleast 3 character"),
    body("email").isEmail().withMessage("invalid"),
    body("password").isLength({min:8}).withMessage("Password  must be contain atleast 3 character")
],registerUser
)
router.post("/login",[
    body("email").isEmail().withMessage("invalid"),
    body("password").isLength({min:8}).withMessage("Password  must be contain atleast 3 character")
],loginUser
)
router.get("/logout",authUser,logoutuser)
router.get("/profile",authUser,getUserProfile)



module.exports=router