const express = require('express')
const connectToMongo = require("./db")
require('dotenv').config();
const userRoutes = require('./routes/login')

const app = express();

app.use(express.json());
connectToMongo();


const port = process.env.PORT;

app.listen(port, ()=>{
  console.log(`Listening to port:${port}`)
})
app.use("/api/user", userRoutes);
app.get("/", (req, res) => {
  res.send("Server is running");
});


