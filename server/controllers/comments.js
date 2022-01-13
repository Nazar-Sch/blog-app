const Comments = require("../models/Comments");
const Posts = require("../models/Posts");

const createComment = async (req, res) => {
  try {
    const { text, author, postId } = req.body;

    const post = await Posts.findById(postId);

    if (!post) return res.status(404).json({ message: "Post not found" });

    const newComment = new Comments({
      text,
      author,
      date: Date.now(),
      likes: [],
    });

    const savedComment = await newComment.save();

    post.comments.push(savedComment._id);
    await post.save();

    res.status(200).json({ post, savedComment });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong. Try again." });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.body;

    const post = await Posts.findById(postId);
    const comment = await Comments.findById(commentId);

    if (!post) return res.status(404).json({ message: "Post not found" });
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    post.comments.filter((comment) => comment._id === commentId);
    await comment.remove();

    res.status(200).json({ message: "Comment deleted!" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong. Try again." });
  }
};

const editComment = async (req, res) => {
  try {
    const { id, text } = req.body;

    // const comment = await Comments.findById(id);

    // if (!comment) return res.status(404).json({ message: "Comment not found" });
    const editedComment = await Comments.findByIdAndUpdate(id, text, {
      new: true,
    });

    res.status(200).json({ comment: editedComment });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong. Try again." });
  }
};

const updateLikes = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comments.findById(id);

    if (
      comment.likes.filter((like) => like.user.toString() === req.user.user_id)
        .length > 0
    ) {
      const removeIndex = comment.likes
        .map((like) => like.user.toString())
        .indexOf(req.user.user_id);
      comment.likes.splice(removeIndex);
    } else {
      comment.likes.unshift({ user: req.user.user_id });
    }

    await comment.save();

    res.status(200).json({ id: comment._id, likes: comment.likes });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Something went wrong. Try again." });
  }
};

module.exports = {
  createComment,
  deleteComment,
  editComment,
  updateLikes,
};
