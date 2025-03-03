const express = require("express");
const { getCoordinates, getDistanceTime, getAutoCompleteSuggestions } = require("../Controllers/mapControllers");
const { authUser } = require("../Middlewares/authMiddleware");
const { query } = require("express-validator");
const router = express.Router();

router.get("/getCoordinates" ,(query("address").isString().isLength({min:3})) ,authUser,getCoordinates)
router.get("/getDistanceTime" ,query("origin").isString().isLength({min:3}),query("destination").isString().isLength({min:3}) ,authUser,getDistanceTime)
router.get("/getSuggestions" ,(query("input").isString().isLength({min:3})) ,authUser,getAutoCompleteSuggestions)

module.exports = router 
