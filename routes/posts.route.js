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

module.exports = router;
