const Posts = require('../models/Posts');
const Tags = require('../models/Tags');
const User = require('../models/User');


const getAllPosts = async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 8;
    const startIdx = (Number(page) - 1) * LIMIT;

    const allDocs = await Posts.countDocuments();

    const posts = await Posts.find()
      .sort({ date: -1 })
      .limit(LIMIT)
      .skip(startIdx);

    res.status(200).json({
      posts,
      currentPage: Number(page),
      amountOfPages: Math.ceil(allDocs / LIMIT),
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong. Try again.' });
  }
};

const getPostsByTags = async (req, res) => {
  try {
    const LIMIT = 8;

    const { tags } = req.query;
    const postsIds = tags.split(',');

    const searchInDocs = {
      _id: { $in: postsIds },
    }

    const allDocs = await Posts.countDocuments(searchInDocs);

    const posts = await Posts.find(searchInDocs)
      .sort({ date: -1 })
      .limit(LIMIT)

    res.status(200).json({
      posts,
      amountOfPages: Math.ceil(allDocs / LIMIT),
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong. Try again.' });
  }
};

const getPostsBySearch = async (req, res) => {
  try {
    const { query } = req.query;
    const title = new RegExp(query, 'i');
    const LIMIT = 8;

    const allDocs = await Posts.countDocuments({ title });

    const posts = await Posts.find({ title })
      .sort({ date: -1 })
      .limit(LIMIT)

    return res.status(200).json({
      posts,
      amountOfPages: Math.ceil(allDocs / LIMIT),
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Something went wrong. Try again.' });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, content, author, tags } = req.body;

    const newPost = await new Posts({
      title: title,
      content: content,
      author: author,
      date: Date.now(),
      likes: [],
      comments: [],
    });

    const existedTags = await Tags.find({ label: { $in: tags } });

    if (existedTags.length > 0) {
      const addingPosts = [
        ...existedTags.reduce((acc, item) => (acc = item.posts), []),
        newPost._id,
      ];

      await Tags.updateMany(
        { label: { $in: tags } },
        { $set: { posts: addingPosts } }
      );
    }

    const newTags = await Tags.create(
      tags
        .map((tag) => ({ label: tag, posts: newPost._id }))
        .reduce((acc, tag) => (acc = tag), {}),
      (err, res, next) => {
        if (err) {
          return;
        }
      }
    );

    const savedPost = await newPost.save();
    return res.status(200).json({ post: savedPost });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Something went wrong. Try again.' });
  }
};

const getPostByID = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Posts.findById(id);
    const tags = await Tags.find({ posts: id });

    const tagsResult = tags.reduce((acc, tag) => {
      acc.push(tag.label);
      return acc;
    }, []);

    return res.status(200).json({ post, relatedTags: tagsResult });
  } catch (e) {
    return res
      .status(500)
      .json({ message: 'Something went wrong. Try again.' });
  }
};

const deletePostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Posts.findById(id);

    const tags = await Tags.find({ posts: id });

    if (req.user.user_id !== post.author.id) {
      return res
        .status(401)
        .json({ message: 'You are not allowd delete this post' });
    }

    if (!post) return res.status(404).json({ message: 'Post not found' });

    await post.remove();
    return res.status(200).json({ message: 'Post deleted Successfully' });
  } catch (e) {
    return res
      .status(500)
      .json({ message: 'Something went wrong. Try again.' });
  }
};

const editPost = async (req, res) => {
  try {
    const { id } = req.params;
    const editedPost = req.body;

    const post = await Posts.findByIdAndUpdate(
      id,
      { ...editedPost, date: Date.now() },
      { new: true }
    );

    if (!post) return res.status(404).json({ message: 'Post not found' });

    return res.status(200).json({ post });
  } catch (e) {
    return res
      .status(500)
      .json({ message: 'Something went wrong. Try again.' });
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
      .json({ message: 'Something went wrong. Try again.' });
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

    res.status(200).json({ post: updatedPost });
  } catch (e) {
    return res
      .status(500)
      .json({ message: 'Something went wrong. Try again.' });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id, comment_id } = req.params;
    const post = await Posts.findByIdAndUpdate(
      id,
      {
        $pull: { comments: { _id: comment_id } },
      },
      { new: true }
    );

    res.status(200).json({ post });
  } catch (e) {
    return res
      .status(500)
      .json({ message: 'Something went wrong. Try again.' });
  }
};

const updateCommentLike = async (req, res) => {
  try {
    const { id, comment_id } = req.params;
    const post = await Posts.findById(id);
    const comment = post.comments.find(
      ({ _id }) => _id.toString() === comment_id
    );

    if (
      comment.likes.filter((like) => like.user.toString() === req.user.user_id)
        .length > 0
    ) {
      const removeIndex = post.likes
        .map((like) => like.user.toString())
        .indexOf(req.user.user_id);
      comment.likes.splice(removeIndex, 1);
    } else {
      comment.likes.push({ user: req.user.user_id });
    }

    const updatedPost = await post.save();

    res.status(200).json({ post: updatedPost });
  } catch (e) {
    return res
      .status(500)
      .json({ message: 'Something went wrong. Try again.' });
  }
};

const editComment = async (req, res) => {
  try {
    const { id, comment_id } = req.params;
    const { text } = req.body;

    const post = await Posts.findById(id);
    const comment = post.comments.find(
      ({ _id }) => _id.toString() === comment_id
    );

    comment.text = text;
    comment.date = Date.now();

    const updatedPost = await post.save();
    res.status(200).json({ post: updatedPost });
  } catch (e) {
    return res
      .status(500)
      .json({ message: 'Something went wrong. Try again.' });
  }
};

// Post ID: 61d229a45ec871b2d7777a30
// User ID mmmm: 61d18027f9412d8ac57b1c06
// Comment ID: 61d8b0d0bcfe15000d4d59f5

module.exports = {
  getAllPosts,
  createPost,
  getPostByID,
  deletePostById,
  editPost,
  updateLikes,
  getPostsBySearch,
  getPostsByTags,
  createComment,
  deleteComment,
  updateCommentLike,
  editComment,
};
