const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrrypt = require("bcrypt")
const { Socket } = require("socket.io")


const captainSchema = mongoose.Schema({
    fullName:{
        firstName:{
            type:String,
            required:true,
            minLength:[3,"First name must be contain atleast 3 character!!"]
        },
        lastName:{
            type:String,
            minLength:[3,"Last name must be contain atleast 3 character!!"]
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowerCase:true,
        minLength:[15,"First name must be contain atleast 3 character!!"],
        match:[ /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address",]
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    scoketId:{
        type:String,
    },
    status:{
        type:String,
        enum:["active","inActive"],
        default:"inActive"
    },
    vehicle:{
         color:{
            type:String,
            required:true,
            minLength:[3,"colour must be 3 character long"]
         },
         capacity:{
            type:Number,
            required:true,
            minLength:[1,"capacity atleast be 1 "]
         },
         numberPlate:{
            type:String,
            required:true,
            trim:true,
            minLength:[10,"numberPlate must be 10 character long"]
        },
        vehicleType:{
             type:String,
             required:true,
             enum:["car","motorCycle","auto"]
         }
    },
    location:{
        ltd:{
            type:Number
        },
        lng:{
            type:Number
        },
    },
    socketId:{
        type:String,
    }
})

captainSchema.methods.generateAuthToken = function(){
    return  jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:"24h"})
}
captainSchema.methods.comparePassword = async function(password){
 return await bcrrypt.compare(password,this.password)
}

captainSchema.statics.hashPassword = async function(password){
    return await bcrrypt.hash(password,10)
}
const captainModel = mongoose.model("captain",captainSchema)
module.exports = captainModel