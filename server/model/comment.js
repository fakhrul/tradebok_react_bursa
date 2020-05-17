const mongoose = require("mongoose");
const Schema = mongoose.Schema;
import timestamps from "mongoose-timestamp";

const schema = new Schema(
  {
    caption: {
      type: String,
    },
    body: {
      type: String,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", schema);
