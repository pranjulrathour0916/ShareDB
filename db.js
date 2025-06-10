const  mongoose  = require("mongoose");
require('dotenv').config()

const mongoURI = process.env.mongoURI

async function connectToMongo() {
    await mongoose.connect(mongoURI)
    console.log("Connected to mongo")
}

module.exports = connectToMongo;