const express = require("express")
const router = express.Router();
const {body} = require("express-validator");
const { registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain } = require("../Controllers/captainController");
const { authCaptain } = require("../Middlewares/authMiddleware");
 

router.post("/register",[
    body("fullName.firstName").isLength({min:3}).withMessage("First Name must be contain atleast 3 character"),
    body("email").isEmail().withMessage("invalid"),
    body("password").isLength({min:8}).withMessage("Password  must be contain atleast 3 character"),
    body("vehicle.color").isLength({min:3}).withMessage("colour must be contain atleast 3 character"),
    body("vehicle.capacity").isLength({min:1}).withMessage(" contain atleast 1 passaneger space"),
    body("vehicle.numberPlate").isLength({min:10}).withMessage("Number plate must be contain atleast 10 character"),
    body("vehicle.vehicleType").isLength({min:3}).withMessage("VechicleType must be contain atleast 3 character"),
],registerCaptain
)

router.post("/login",[
    body("email").isEmail().withMessage("invalid"),
    body("password").isLength({min:8}).withMessage("Password  must be contain atleast 3 character")
],loginCaptain
)
router.get("/profile",authCaptain,getCaptainProfile)
router.get("/logout",authCaptain,logoutCaptain)

module.exports = router