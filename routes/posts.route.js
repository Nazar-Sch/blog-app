const { Router } = require("express");

const router = Router();

const auth = require("../middleware/auth");
const {
  getAllPosts,
  getPostsBySearch,
  createPost,
  getPostBuID,
  deletePostById,
  editPost,
  updateLikes,
  getPostsByTags,
} = require("../controllers/posts");

router.get("/", auth, getAllPosts);
router.get("/topics", auth, getPostsByTags);
router.get("/search", auth, getPostsBySearch);
router.post("/new", auth, createPost);
router.get("/:id", auth, getPostBuID);
router.delete("/delete/:id", auth, deletePostById);
router.put("/edit/:id", auth, editPost);
router.patch("/likes/:id", auth, updateLikes);

module.exports = router;
