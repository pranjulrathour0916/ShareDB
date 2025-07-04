const express = require("express");
const connectToMongo = require("./db");
require("dotenv").config();
const bodyParser = require("body-parser");
const userRoutes = require("./routes/login");
const postRoutes = require("./routes/userdetails");
const webhookRoutes = require('./routes/webhook')
const app = express();

app.use(express.json());
connectToMongo();

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Listening to port:${port}`);
});
app.use(bodyParser.json());
app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/webhook", webhookRoutes)

app.get("/", (req, res) => {
  res.send("Server is running");
});
