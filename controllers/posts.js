const Posts = require("../models/Posts");
const Tags = require("../models/Tags");
const User = require("../models/User");

// const getAllPosts = async (req, res) => {
//   const { page } = req.query;
//   const LIMIT = 8;
//   const startIdx = (Number(page) - 1) * LIMIT;

//   const allDocs = await Posts.countDocuments();
//   console.log(page);
//   try {
//     const posts = await Posts.find().sort({ _id: -1 }).limit(LIMIT).skip(startIdx);
    
//     res.status(200).json({ posts, currentPage: Number(page), amountOfPages: Math.ceil(allDocs/LIMIT) });
//   } catch (error) {
//     res.status(500).json({ message: "Something went wrong. Try again." });
//   }
// };


const getAllPosts = async (req, res) => {
  try {
    const posts = await Posts.find();
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong. Try again." });
  }
};

const getPostsByTags = async (req, res) => {
  try {
    const { tags } = req.query;
    const postsIds = tags.split(",");

    const posts = await Posts.find({
      _id: { $in: postsIds },
    });

    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong. Try again." });
  }
};

const getPostsBySearch = async (req, res) => {
  try {
    const { query, tags } = req.query;
    const title = new RegExp(query, "i");

    const posts = await Posts.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });

    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong. Try again." });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, content, author, tags } = req.body;

    const newPost = new Posts({
      title: title,
      content: content,
      author: author,
      date: Date.now(),
      tags: tags,
      likes: [],
      comments: [],
    });

    tags.map((tag) =>
      new Tags({
        label: tag,
        posts: newPost._id,
      }).save()
    );

    const savedPost = await newPost.save();
    res.status(200).json({ post: savedPost });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong. Try again." });
  }
};

const getPostBuID = async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);

    res.status(200).json({ post });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong. Try again." });
  }
};

const deletePostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Posts.findById(id);

    if (req.user.user_id !== post.author.id) {
      return res
        .status(401)
        .json({ message: "You are not allowd delete this post" });
    }

    if (!post) return res.status(404).json({ message: "Post not found" });

    await post.remove();
    return res.status(200).json({ message: "Post deleted Successfully" });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Something went wrong. Try again." });
  }
};

const editPost = async (req, res) => {
  try {
    const { id } = req.params;
    const editedPost = req.body;

    const post = await Posts.findByIdAndUpdate(id, editedPost, { new: true });
    if (!post) return res.status(404).json({ message: "Post not found" });
    console.log(post);
    return res.status(200).json({ post });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Something went wrong. Try again." });
  }
};

const updateLikes = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Posts.findById(id);

    if (
      post.likes.filter((like) => like.user.toString() === req.user.user_id)
        .length > 0
    ) {
      const removeIndex = post.likes
        .map((like) => like.user.toString())
        .indexOf(req.user.user_id);
      post.likes.splice(removeIndex);
    } else {
      post.likes.push({ user: req.user.user_id });
    }

    await post.save();

    res.status(200).json({ id: post._id, likes: post.likes });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Something went wrong. Try again." });
  }
};

const createComment = async (req, res) => {
  try {
    const { text } = req.body;
    const { id } = req.params;
    const post = await Posts.findById(id);
    const user = await User.findById(req.user.user_id);

    const comment = {
      text,
      likes: [],
      author: {
        firstName: user.firstName,
        lastName: user.lastName,
        id: req.user.user_id,
      },
      date: Date.now(),
    };

    post.comments.push(comment);

    const updatedPost = await Posts.findByIdAndUpdate(id, post, { new: true });

    res.status(200).json({ updatedPost });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Something went wrong. Try again." });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id, comment_id } = req.params;
    const post = await Posts.findById(id);
    const comment = post.comments.find(
      ({ _id }) => _id.toString() === comment_id
    );
    if (!comment) {
      return res.status(404).json({ error: "Comment not found!" });
    }

    if (comment.author.id !== req.user.user_id) {
      return res.status(401).json({ error: "User not allowed remove comment" });
    }

    const removeIndex = post.comments
      .map((comment) => comment.author.id.toString())
      .indexOf(req.user.user_id);
    post.comments.splice(removeIndex);

    const updatedPost = await post.save();

    res.status(200).json({ post: updatedPost });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Something went wrong. Try again." });
  }
};

// Post ID: 61d229a45ec871b2d7777a30
// User ID mmmm: 61d18027f9412d8ac57b1c06
// Comment ID: 61d8b0d0bcfe15000d4d59f5

module.exports = {
  getAllPosts,
  createPost,
  getPostBuID,
  deletePostById,
  editPost,
  updateLikes,
  getPostsBySearch,
  getPostsByTags,
  createComment,
  deleteComment,
};
