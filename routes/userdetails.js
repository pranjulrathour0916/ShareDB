const express = require("express");

const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const Post = require("../models/Posts");

const auth = require("../middleware/authenticate");

// Fetch all posts in the Home page
router.get("/allPosts", auth, async (req, res) => {
  try {
    const allDetails = await Post.find();
    console.log(allDetails);
    res.status(200).json(allDetails);
  } catch (error) {
    console.error("Error", error.message);
    return res.status(500).json("Internal server error");
  }
});

// Create your blog

router.post("/createBlog", auth,[
    body('title',"Ttitle Must be of 3 letters").isLength({min : 3}),
    body("desc", "Decsription must be ot atleadt 10 words").isLength({min:10})
], async (req, res) => {
    try {
        const result = validationResult(req);
        if(!result.isEmpty())
        {
            return res.status(400).json({errors : result.array()})
        }
        const { title, desc, image } = req.body;
        const newblog = await Post.create({
            "title" : title,
            image : image,
            "desc" : desc,
            logUser : req.user.id
        })

        res.json(newblog);

    } catch (error) {
        console.error("Error", error.message);
        return res.status(400).json("Internal server error");
    }
});

// Edit your blog

router.post('/editblog/:id', auth,[
  body('title',"Ttitle Must be of 3 letters").isLength({min : 3}),
    body("desc", "Decsription must be ot atleadt 10 words").isLength({min:10})
], async(req, res) => {
  try {
    const result = validationResult(req);
        if(!result.isEmpty())
        {
            return res.staus(400).json({errors : result.array()})
        }
    const {title, desc} = req.body;
    const findPost = await Post.findByIdAndUpdate(
      req.params.id,
      {"title": title, "desc" : desc},
      {new : true}
    )
    res.json(findPost);
  } catch (error) {
    console.error("Error : ", error.message);
    return res.status(500).json("Internal server error");
  }
})

// Dlete the blog

router.delete("/deleteBlog/:id", auth, async(req, res) =>{
  try {
    const findPost = await Post.findByIdAndDelete(req.params.id);
    if(!findPost){
      return res.status(400).json("Post not found")
    }
    res.json(findPost, "Post deleted")
  } catch (error) {
    console.error("Error : ", error.message);
    return res.status(500).json("Internal Server error");
  }
})

// POST route for Comments and likes

router.post("/cmtlike/:id", auth, async(req, res) => {
  try {
    const findPost = await Post.findByIdAndUpdate(req.params.id)
    
  } catch (error) {
    
  }
})

module.exports = router;
