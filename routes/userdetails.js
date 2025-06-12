const express = require("express");

const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const Post = require("../models/Posts");

const auth = require("../middleware/authenticate");

router.get("/allPosts", auth, async (req, res) => {
  try {
    const allDetails = await User.find();
    console.log(allDetails);
    res.status(200).json(allDetails);
  } catch (error) {
    console.error("Error", error.message);
    return res.status(500).json("Internal server error");
  }
});

router.post("/createBlog", auth,[
    body('title',"Ttitle Must be of 3 letters").isLength({min : 3}),
    body("desc", "Decsription must be ot atleadt 10 words").isLength({min:10})
], async (req, res) => {
    try {
        const userId = req.user.id;
        const result = validationResult(req);
        if(!result.isEmpty())
        {
            return res.staus(400).json({errors : result.array()})
        }
        const { title, desc } = req.body;
        const newblog = await Post.create({
            "title" : title,
            image : req.user.id,
            "desc" : desc,
            logUser : req.user.id
        })

        res.json(newblog);

    } catch (error) {
        console.error("Error", error.message);
        return res.status(400).json("Internal server error");
    }
});

module.exports = router;
