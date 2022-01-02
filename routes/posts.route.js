const { Router } = require("express");
const Posts = require("../models/Posts");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const posts = await Posts.find();
    return res.status(200).json({ posts });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Something went wrong. Try again." });
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
    return res.status(200).json({ savedPost });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Something went wrong. Try again." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    return res.status(200).json({ post });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Something went wrong. Try again." });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Posts.findByIdAndDelete(id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    return res.status(200).json({ message: "Post deleted Successfully" });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Something went wrong. Try again." });
  }
});

router.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const editedPost = req.body;
    const post = await Posts.findByIdAndUpdate(id, editedPost);
    if (!post) return res.status(404).json({ message: "Post not found" });

    return res.status(200).json({ post });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Something went wrong. Try again." });
  }
});

module.exports = router;
