const { Router } = require("express");

const router = Router();

const auth = require("../middleware/auth");
const {
  getAllPosts,
  getPostsBySearch,
  createPost,
  getPostByID,
  deletePostById,
  editPost,
  updateLikes,
  getPostsByTags,
  createComment,
  deleteComment,
  updateCommentLike,
  editComment,
} = require("../controllers/posts");

router.get("/", auth, getAllPosts);
router.get("/topics", auth, getPostsByTags);
router.get("/search", auth, getPostsBySearch);
router.post("/new", auth, createPost);
router.get("/:id", auth, getPostByID);
router.delete("/delete/:id", auth, deletePostById);
router.put("/edit/:id", auth, editPost);
router.patch("/likes/:id", auth, updateLikes);

router.post("/comments/:id", auth, createComment);
router.delete("/comments/:id/:comment_id", auth, deleteComment);
router.patch("/comments/likes/:id/:comment_id", auth, updateCommentLike);
router.patch("/comments/edit/:id/:comment_id", auth, editComment);

module.exports = router;
