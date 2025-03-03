const mongoose = require("mongoose")

const rideSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required:true
    },
    captain:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "captain",
    },
    pickUp:{
        type:String,
        required:true
    },
    destination:{
        type:String,
        required:true,
    },
    fare:{
        type : Number,
        required:true
    },
    status:{
        type:String,
        enum:["pending","accepted","onGoing","cancelled","completed"],
        default:"pending"
    },
    duration:{
        type:Number
    },
    distance:{
        type:String
    },
PaymentID:{
    type:String
},
orderID:{
    type:String,
},
signature:{
    type:String
},
distanceTime:{
    distance:{
        type:Number,
    },
    duration:{
        type:String,
    }
}
,
otp:{
    type:String,
    select:false,
    required:true
}
})

module.exports = mongoose.model("ride",rideSchema)