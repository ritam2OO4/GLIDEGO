const rideModel = require("../modelsSchema/rideModel");
const { displacementTime } = require("./mapsService");
const crypto = require('crypto');



const generateOtp = (digits) => {
    if (digits <= 0) throw new Error("Digits must be greater than 0");

    const min = 10 ** (digits - 1);  // Smallest number with given digits
    const max = (10 ** digits) - 1;  // Largest number with given digits

    const otpBuffer = crypto.randomBytes(4);
    const otpValue = otpBuffer.readUInt32BE(0);

    return (min + (otpValue % (max - min + 1))).toString();
};

const calculateFare = async (pickUp,destination)=>{
   if(!pickUp || !destination) throw new Error('All fields are required');

   const distanceTime = await displacementTime(pickUp,destination)
   if(!distanceTime) throw new Error("didn't get the location!!");

   const baseFare = {
          auto:30,
          car:50,
          moto:20
}
   const perKmRate = {
          auto:10,
          car:15,
          moto:8,
}
   const perMinuteRate = {
          auto:2,
          car:3,
          moto:1.5,
}
return {
    auto: Math.round(baseFare.auto + (((distanceTime.distance) * perKmRate.auto) + ((distanceTime.duration) * perMinuteRate.auto))),
    car: Math.round(baseFare.car + (((distanceTime.distance) * perKmRate.car) + ((distanceTime.duration) * perMinuteRate.car))),
     moto: Math.round(baseFare.moto + (((distanceTime.distance) * perKmRate.moto) + ((distanceTime.duration) * perMinuteRate.moto)))
 
} 
}



const rideService = async ({user,pickUp,destination,vehicleType})=>{

    if(!user || !pickUp || !destination || !vehicleType) throw new Error('All fields are required');
try{
    const fare = await calculateFare(pickUp, destination);
    const createRide = await rideModel.create({
        user,
        pickUp,
        destination,
         otp:generateOtp(6),
        fare:fare[vehicleType]
    })
    return createRide
}
catch (err) {
return  new Error(err.message);
}
}











module.exports = {calculateFare,rideService}