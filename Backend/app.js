const express = require("express")
const app = express();
const dotenv = require("dotenv")
dotenv.config()

const cookieParser = require("cookie-parser")

const connectToDb = require("./db/db")
const cors = require("cors")
const userRouter = require("./Routes/userRouter")
const captainRouter = require("./Routes/captainRouter")
const mapRouter = require("./Routes/mapRouter")
const rideRouter = require("./Routes/rideRouter")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

 connectToDb()
app.use(cookieParser())
 app.use("/users",userRouter)
 app.use("/captains",captainRouter)
 app.use("/maps",mapRouter)
 app.use("/rides",rideRouter)



module.exports= app