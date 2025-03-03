const mongoose = require("mongoose")


function connectToDb(){
    mongoose.connect(process.env.DB_CONNECT)
    .then(() => {
        console.log("Connected to MongoDB successfully!");
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB:", err.message);
    });
}    


module.exports = connectToDb