const express = require('express');

const router = express.Router();

router.post("/", (req, res) => {
  console.log("📩 Webhook received:", req.body);

  // Optional: Handle specific event types
  const { event, data } = req.body;

  if (event === "user_created") {
    console.log("A user was created:", data);
  }

  if(event === "login_Success"){
    console.log("Login Successfull", data)
  }

  res.status(200).json({ message: "Webhook received successfully" });
});

module.exports = router;