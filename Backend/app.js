const express = require("express")
const app = express();
const dotenv = require("dotenv")
dotenv.config()

const cookieParser = require("cookie-parser")

const connectToDb = require("./db/db")
const cors = require("cors")
const userRouter = require("./Routes/userRouter")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

 connectToDb()
app.use(cookieParser())
 app.use("/users",userRouter)



module.exports= app