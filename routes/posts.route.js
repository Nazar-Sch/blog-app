const { Router } = require("express");
const Posts = require("../models/Posts");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const posts = await Posts.find();
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong. Try again." });
  }
});

router.post("/new", async (req, res) => {
  try {
    const newPost = new Posts({
      title: req.body.title,
      content: req.body.content,
      date: Date.now(),
    });
    const savedPost = await newPost.save();
    res.status(200).json({ savedPost });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong. Try again." });
  }
});

module.exports = router;
