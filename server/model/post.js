const mongoose = require("mongoose");
const Schema = mongoose.Schema;
import timestamps from "mongoose-timestamp";

const schema = new Schema(
  {
    caption: {
      type: String,
    },
    uri: {
      type: String,
    },
    reports: {
      type: Number,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    comments: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }],
    likes: [{
      type: Schema.Types.ObjectId,
      ref: 'LikePost'
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", schema);
