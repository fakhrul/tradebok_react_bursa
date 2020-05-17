const mongoose = require("mongoose");
const Schema = mongoose.Schema;
import timestamps from 'mongoose-timestamp';
// import Follower from "./_follower";
// import Following from "./_following";

const schema = new Schema({
  authId: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    required: true,
  },
  handle:{
    type: String,
    trim: true,
    required: true,
  },
  about: String,
  followerIds: [Schema.Types.ObjectId],
  followingIds: [Schema.Types.ObjectId],
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }],
  postLikes: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }],
  commentLikes: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]
}, {timestamps: true});



// userSchema.plugin(timestamps);

// userSchema.index({ createdAt: 1, updatedAt: 1 });

module.exports = mongoose.model("User", schema);
