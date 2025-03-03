const express = require("express");
const { authUser, authCaptain } = require("../Middlewares/authMiddleware");
const { body, query } = require("express-validator");
const { rideCreate, getFare, confirmRide, startRide, endRide } = require("../Controllers/rideConroller");
const router = express.Router();

router.post("/create"
    , body("pickUp").isString().isLength({ min: 3 }).withMessage('Invalid pickup address')
    , body("destination").isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn(['auto', 'car', 'moto']).withMessage('Invalid vehicle type')
    , authUser, rideCreate)

router.get('/getFare',
    authUser,
    query('pickUp').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    query('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    getFare
)
router.post('/confirm',
    authCaptain,
    body('rideId').isString().isLength({ min: 3 }).withMessage('Invalid rider'),
    confirmRide
)
router.get('/start-ride',
    authCaptain,
    query('rideId').isString().isLength({ min: 3 }).withMessage('Invalid rider'),
    query('otp').isNumeric().isLength({ min: 6, max: 6 }).withMessage('Invalid otp'),
    startRide
)
router.post('/end-ride',
    authCaptain,
    body('rideId').isString().isLength({ min: 3 }).withMessage('Invalid rider'),
    endRide
)






module.exports = router