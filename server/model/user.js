const mongoose = require("mongoose");
const Schema = mongoose.Schema;
import timestamps from 'mongoose-timestamp';
// import Follower from "./_follower";
// import Following from "./_following";

const schema = new Schema({
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
  followers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  following: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }],
  likePost: [{
    type: Schema.Types.ObjectId,
    ref: 'LikePost'
  }],
  likeComment: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  lastSeen: {
    type: Date,
    default: Date.now
  },
  chats: [{
    type: Schema.Types.ObjectId,
    ref: 'Chat'
  }]
}, {timestamps: true});


module.exports = mongoose.model("User", schema);
