const http = require("http")
const app = require("./app")
const { initializeSocket } = require("./socket")

const port = process.env.PORT || 3000

const server = http.createServer(app)

initializeSocket(server)
app.get("/",(req,res)=>{
    res.send("hello")
})

server.listen(port,()=>{
    console.log(`server is running at port ${port}`)
})