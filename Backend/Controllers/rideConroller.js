const { validationResult} = require("express-validator")
const {calculateFare,rideService} = require("../Services/rideService")

module.exports.rideCreate = async (req,res,next)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); // Exit here
        }
        const {pickUp,destination,vehicleType} = req.body;
        // console.log("hqw")
        if(!pickUp || !destination || !vehicleType || !req.user.id) return res.status(500).json({message:"props missing"}) 
        const createRide = await rideService({user:req.user.id,pickUp,destination,vehicleType})
        return res.status(200).json(createRide)
    }catch(err){
         return res.status(500).json({message:err.message})
    }
}
module.exports.getFare = async (req,res,next)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() }); // Exit here
        }

        const {pickUp,destination}=req.query
    if(!pickUp || !destination) return res.status(500).json({message:"props missing"})
        const fare = await rideService.getFare(pickUp, destination);
            return res.status(200).json(fare);
        }
     catch (err) {
        return res.status(500).json({ message: err.message });
    }
}