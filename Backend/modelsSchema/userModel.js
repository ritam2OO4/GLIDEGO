const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
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
        minLength:[15,"First name must be contain atleast 3 character!!"]
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    socketId:{
        type:String
    }
})

userSchema.methods.generateAuthToken = function (){
    const token = jwt.sign({id: this._id},process.env.JWT_SECRET,{expiresIn:"24h"})
    return token
}
userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password,this.password) 
}
userSchema.statics.hashPassword = async function (password){
    return await bcrypt.hash(password,10)
}


const userModel = mongoose.model('user',userSchema)

module.exports = userModel