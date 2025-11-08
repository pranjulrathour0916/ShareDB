const express = require("express");
const router = express.Router();
const axios = require("axios");
const bcrypt = require("bcrypt");
const User = require("../models/User");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

router.post(
  "/signUp",
  [
    body("name", "Must be of more than 3 letters").isLength({ min: "3" }),
    body("email", "Incorrect email address").isEmail(),
    body("password", "Password must be of more than 5 digits").isLength({
      min: "5",
    }),
  ],
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }
      const { name, email, password } = req.body;
      const checkUser = await User.findOne({ email });
      if (checkUser) {
        return res.status(400).json("This email already exist");
      }
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      const createUser = await User.create({
        name,
        email,
        password: hashPassword,
      });
      res.json(createUser);

      await axios.post("http://localhost:5000/api/webhook", {
        event: "user_created",
        data: {
          id: createUser._id,
          name: createUser.name,
          email: createUser.email,
          createdAt: createUser.createdAt,
        },
      });
    } catch (error) {
      console.error("Error creating user:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.post(
  "/login",
  [
    body("email", "Please enter the valid email").isEmail(),
    body("password", "Incorrect credentials").isLength({ min: "5" }),
  ],
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }
      const { email, password } = req.body;
      const findUser = await User.findOne({ email });
      if (!findUser) {
        return res.status(400).json("Incorrect credentials");
      }
      const checkPass = await bcrypt.compare(password, findUser.password);
      if (!checkPass) {
        return res.status(400).json("Incorrect credentials");
      }
      const payload = {
        user: {
          id: findUser._id,
          email: email,
        },
      };
      const token = jwt.sign(payload, process.env.JWT_TOKEN);
      res.status(200).json(token);
      await axios.post("http://localhost:5000/api/webhook", {
        event: "login_Success",
        data: {
          id: findUser._id,
          name: findUser.name,
          email: findUser.email,
          createdAt: findUser.createdAt, 
        },
      });
    } catch (error) {
      console.error("Error: ", error.message);
      res.status(500).json("Internal server error");
    }
  }
);

module.exports = router;
