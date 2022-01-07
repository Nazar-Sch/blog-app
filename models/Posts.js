const { Schema, model } = require("mongoose");

const schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, required: true },
  author: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    id: { type: String, required: true },
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    },
  ],
  tags: [String],
  comments: [
    {
      text: { type: String, required: true },
      date: { type: Date, required: true },
      author: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
        id: { type: String, required: true },
      },
      likes: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "user",
          },
        },
      ],
    },
  ],
});

module.exports = model("Posts", schema);
