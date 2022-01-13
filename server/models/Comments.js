const { Schema, model } = require("mongoose");

const commentsSchema = new Schema({
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
});

module.exports = model("Comments", commentsSchema);
