const  mongoose  = require("mongoose");
require('dotenv').config()

const mongoURI = "mongodb+srv://pranjalrathore9838_db_user:R@th3824our@mysharebkend.0ssau6e.mongodb.net/?appName=MyShareBKend"

async function connectToMongo() {
    await mongoose.connect(mongoURI)
    console.log("Connected to mongo")
}

module.exports = connectToMongo;