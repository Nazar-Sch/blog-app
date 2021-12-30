const { Router } = require("express");

const {
  getAllPosts,
  createPost,
  getPostBuID,
} = require("../controllers/posts");
const auth = require("../middleware/auth");

const router = Router();

router.get("/", auth, getAllPosts);
router.post("/new", auth, createPost);
router.get("/:id", auth, getPostBuID);

module.exports = router;
