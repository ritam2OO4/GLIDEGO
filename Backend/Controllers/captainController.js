const jwt = require("jsonwebtoken");
const captainModel = require("../modelsSchema/captainModel");
const { captainService } = require("../Services/captainService");
const { validationResult } = require("express-validator");
const blacklistTokenModel = require("../modelsSchema/blacklistTokenModel");

module.exports.registerCaptain = async function (req, res, next) {
  try {
    // Validate request data
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        
        const { fullName, email, password, vehicle } = req.body;
       
    // Check if captain already exists
    const captainExists = await captainModel.findOne({ email });
    if (captainExists) {
      return res.status(409).json({ message: "Captain already exists, try logging in!" });
    }

    // Hash the password
    const hashPassword = await captainModel.hashPassword(password);
    // Prepare the captain data
    const captainData = {
      firstName: fullName.firstName,
      lastName: fullName.lastName,
      email,
      password: hashPassword,
    color:vehicle.color,
    capacity:vehicle.capacity,
    numberPlate:vehicle.numberPlate,
    vehicleType:vehicle.vehicleType,
   };
    // Save the captain using the service
    const captain = await captainService(captainData);
    // Respond with success
    res.status(201).json({ message: "Captain registered successfully!", captain });
  } catch (error) {
    console.error("Error registering captain:", error.message);
    next(error); // Pass error to the global error handler
  }
};

module.exports.loginCaptain = async function(req,res,next){
  
  try{
const errors = validationResult(req);
if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() }); // Exit here
 
    const {email,password}=req.body
    const captain = await captainModel.findOne({email}).select("+password");
    if(!captain) return res.status(401).json({message:"invalid email or password!!"}); 
    
    const isValidPassword =  await captain.comparePassword(password)
    if(!isValidPassword) return res.status(401).json({message:"invalid email or password!!"}); 

    const token = captain.generateAuthToken()
    res.cookie("token",token)
    res.status(201).json({ token, captain })
  }
  catch(err){
    res.status("201").json({message:"invalid email or passsword!!"})

  }

}

module.exports.getCaptainProfile = async function(req,res,next){
res.status("200").json(req.captain)
}

module.exports.logoutCaptain=async function(req,res,next){
 try{
  const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);

  const blacklistedToken = await blacklistTokenModel.create({token})

  res.clearCookie("token")
  res.status("202").json({message:"logged Out!!"})

 }
 catch(error){
  res.status("201").json({message:"can't logOut!!"})
 }
}