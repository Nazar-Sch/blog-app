const Tags = require("../models/Tags");

const getAllTags = async (_, res) => {
  try {
    const tags = await Tags.find();

    res.status(200).json({ tags });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong. Try again." });
  }
};

module.exports = { getAllTags };

