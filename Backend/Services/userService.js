const userModel = require("../modelsSchema/userModel")


module.exports.createUser = async({firstName,lastName,email,password})=>{
if(!firstName || !email || !password){
     throw new Error("All fields are not provided!!")
} 
const user = await userModel.create({
    fullName:{
        firstName,
        lastName,
    },
    email,
    password
})
return user
}