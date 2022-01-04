const express = require("express");
const mongoose = require("mongoose");

const Posts = require("../models/Posts");
const Tags = require("../models/Tags");

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
    const postsIds = tags.split(',');
    
    const posts = await Posts.find({
      _id: { $in: postsIds }
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
      post.likes.unshift({ user: req.user.user_id });
    }

    await post.save();

    res.status(200).json({ id: post._id, likes: post.likes });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Something went wrong. Try again." });
  }
};

module.exports = {
  getAllPosts,
  createPost,
  getPostBuID,
  deletePostById,
  editPost,
  updateLikes,
  getPostsBySearch,
  getPostsByTags,
};
