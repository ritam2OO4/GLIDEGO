const socketIo = require("socket.io");
const userModel = require("./modelsSchema/userModel");
const captainModel = require("./modelsSchema/captainModel");

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log("Client connected:", socket.id);

        // Store user details in socket.data
        socket.on("join", async (data) => {
            const { userId, userType } = data;
            socket.data.userId = userId;
            socket.data.userType = userType;

            if (userType === "user") {
                await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
            } else if (userType === "captain") {
                await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
            }
        });

        socket.on("update-location-captain", async (data)=>{
               const {userId,location} = data
                if(!userId || !location || !location.ltd || !location.lng) 
                    return socket.emit("error",{message:"Invalid location or data!!"})
                      await captainModel.findByIdAndUpdate(userId,{location:{
                        ltd:location.ltd,
                        lng:location.lng,
                      }}) ;
                
            })

        // Handle disconnect
        socket.on("disconnect", async () => {
            const { userId, userType } = socket.data; // Retrieve stored data
            if (userId && userType) {
                if (userType === "user") {
                    await userModel.findByIdAndUpdate(userId, { socketId: "" });
                } else if (userType === "captain") {
                    await captainModel.findByIdAndUpdate(userId, { socketId: "" });
                }
            }
            console.log("Client disconnected:", socket.id);
        });
    });
}

const sendMessageToSocketId = (socketId, messageObject) => {
        if (io) {
            io.to(socketId).emit(messageObject.event, messageObject.data);
        } else {
            console.log('Socket.io not initialized.');
        }
    }

module.exports = { initializeSocket,sendMessageToSocketId };
