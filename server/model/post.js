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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", schema);
