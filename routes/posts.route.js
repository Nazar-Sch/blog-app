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
  createComment,
  deleteComment,
} = require("../controllers/posts");

router.get("/", auth, getAllPosts);
router.get("/topics", auth, getPostsByTags);
router.get("/search", auth, getPostsBySearch);
router.post("/new", auth, createPost);
router.get("/:id", auth, getPostBuID);
router.delete("/delete/:id", auth, deletePostById);
router.put("/edit/:id", auth, editPost);
router.patch("/likes/:id", auth, updateLikes);
router.post("/comments/:id", auth, createComment);
router.delete("/comments/:id/:comment_id", auth, deleteComment);

module.exports = router;
