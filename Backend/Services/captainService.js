const captainSchema = require("../modelsSchema/captainModel")


module.exports.captainService = async function({firstName,lastName,email,password,color,capacity,numberPlate,vehicleType}){
    if(!firstName || !lastName || !email || !password || !color || !capacity || !numberPlate || !vehicleType) return  new Error("All fields are not provided!!")
        (firstName,lastName,email,password,color,capacity,numberPlate,vehicleType)

    const captain = await captainSchema.create({
        fullName:{
            firstName,
            lastName,
        },
        email,
        password,
        vehicle:{
            color,
        capacity,
        numberPlate,
        vehicleType,
        }
    })
    return captain
}