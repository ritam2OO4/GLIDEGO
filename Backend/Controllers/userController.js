const blacklistTokenModel = require("../modelsSchema/blacklistTokenModel");
const userModel = require("../modelsSchema/userModel")
const {createUser} = require("../Services/userService")
const {validationResult} = require("express-validator")
// const jwt = 

module.exports.registerUser = async (req, res, next) => {
    try {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // Exit here
      }
  
      const { fullName, email, password } = req.body;
      const userExists = await userModel.findOne({email});

      if(userExists) return res.status(401).json({ errors: errors.array() });

      const hashPassword = await userModel.hashPassword(password);
      const user = await createUser({
        firstName:fullName.firstName,
        lastName:fullName.lastName,
        email,
        password: hashPassword,
      });
      const token = user.generateAuthToken();
      res.status(201).json({ token, user });
    } catch (error) {
      // Catch unexpected errors and handle them
      next(error); // Pass the error to the Express error handler
    }
  };
module.exports.loginUser = async (req, res, next) => {
    try {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // Exit here
      }
  
      const { email, password } = req.body;
  
      const user = await userModel.findOne({email}).select("+password");
     if(!user) return res.status(401).json({message:"invalid email or password!!"}); 

     const validPassword = await user.comparePassword(password);

     if(!validPassword) return res.status(401).json({message:"invalid email or password!!"});
     
     const token = user.generateAuthToken();
     
     res.cookie("token",token)
     res.status(201).json({ token, user });

    } catch (error) {
      // Catch unexpected errors and handle them
      res.status(201).json({message:"invalid email or passsword!!"})
    }
  };
module.exports.getUserProfile= async(req,res,next)=>{
 res.status(200).json(req.user) 
}
module.exports.logoutuser= async(req,res,next)=>{
  let token = req.cookies.token || req.headers.authorization?.split("")[1];

  await blacklistTokenModel.create({token})


  res.clearCookie("token")
res.status(202).json({message:"logged Out!!"})
}