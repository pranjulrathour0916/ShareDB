const express = require("express");
const connectToMongo = require("./db");
require("dotenv").config();
const cors = require("cors")
const userRoutes = require("./routes/login");
const postRoutes = require("./routes/userdetails");
const webhookRoutes = require('./routes/webhook')
const app = express();

connectToMongo();

app.use(cors());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Listening to port:${port}`);
});
app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/webhook", webhookRoutes)

app.get("/", (req, res) => {
  res.send("Server is running");
});
