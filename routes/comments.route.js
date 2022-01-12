const { Router } = require("express");

const router = Router();

const auth = require("../middleware/auth");
const {
  createComment,
  deleteComment,
  editComment,
  updateLikes,
} = require("../controllers/comments");

router.get("/new", auth, createComment);
router.get("/delete", auth, deleteComment);
router.get("/edit", auth, editComment);
router.get("/like/:id", auth, updateLikes);

module.exports = router;
