const blacklistTokenModel = require("../modelsSchema/blacklistTokenModel");
const captainModel = require("../modelsSchema/captainModel");
const userModel = require("../modelsSchema/userModel");
const jwt = require("jsonwebtoken");

module.exports.authUser = async (req, res, next) => {
    try {
        // Get token from cookies or Authorization header
        const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);
        if (!token) {
            return res.status(401).json({ message: "Unauthorized access: Token not provided" });
        }
        const blacklistedToken = await blacklistTokenModel.findOne({token})
        if(blacklistedToken) return res.status("401").json({message:"Unauthorized access : token expired try to login first!!"})
// Verify the token
const decoded = jwt.verify(token, process.env.JWT_SECRET);
if (!decoded || !decoded.id) {
    return res.status(401).json({ message: "Unauthorized access: Invalid token" });
}

        // Check if the user exists
        const user = await userModel.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized access: User not found" });
        }
        // Attach user to the request object
        req.user = user;
       return next(); // Proceed to the next middleware/route handler
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Unauthorized access: Token expired" });
        }
        return res.status(401).json({ message: "Unauthorized access" });
    }
};

module.exports.authCaptain = async (req,res,next)=>{
   try{
      const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);

      if(!token)  return res.status(401).json({ message: "Unauthorized access: Token not provided" });
     
      const blacklistedToken = await blacklistTokenModel.findOne({token})
        
      if(blacklistedToken) return res.status("401").json({message:"Unauthorized access : token expired try to login first!!"})

      const decoded = jwt.verify(token,process.env.JWT_SECRET)

      if(!decoded || !decoded?.id) return res.status(401).json({ message: "Unauthorized access: Invalid token" });

      const captain = await captainModel.findById(decoded?.id)

      req.captain = captain
      return next();
   }
   catch(err){
    if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Unauthorized access: Token expired" });
    }
    return res.status(401).json({ message: "Unauthorized access" });
   }
}
