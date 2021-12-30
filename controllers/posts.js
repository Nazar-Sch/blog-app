const express = require("express");
const mongoose = require("mongoose");

const Posts = require("../models/Posts");

const getAllPosts = async (req, res) => {
  try {
    const posts = await Posts.find();
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong. Try again." });
  }
};

const createPost = async (req, res) => {
  try {
    const newPost = new Posts({
      title: req.body.title,
      content: req.body.content,
      date: Date.now(),
    });
    const savedPost = await newPost.save();
    res.status(200).json({ savedPost });
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

module.exports = { getAllPosts, createPost, getPostBuID };
