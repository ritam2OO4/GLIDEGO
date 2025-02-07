const express = require("express");
const { authUser } = require("../Middlewares/authMiddleware");
const { body, query } = require("express-validator");
const { rideCreate, getFare } = require("../Controllers/rideConroller");
const router = express.Router();

router.get("/create"
,body("pickUp").isString().isLength({min:3}).withMessage('Invalid pickup address')
,body("destination").isString().isLength({min:3}).withMessage('Invalid destination address'),
body('vehicleType').isString().isIn([ 'auto', 'car', 'moto' ]).withMessage('Invalid vehicle type')
 ,authUser,rideCreate)

 router.get('/getFare',
    authUser,
    query('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    query('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    getFare
)






module.exports = router