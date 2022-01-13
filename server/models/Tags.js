const { Schema, model } = require("mongoose");

const tagsSchema = new Schema({
  label: {
    type: String,
    required: true,
    unique: true,
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Posts",
    },
  ],
});

module.exports = model("Tags", tagsSchema);
