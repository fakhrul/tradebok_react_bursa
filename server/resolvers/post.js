import { promisify } from "../helper";
const User = require("../model/user");
const Comment = require("../model/comment");
const LikePost = require("../model/likePost");

const resolvers = {
  author: (post) => promisify(User.findById(post.author)),
  comments: (post) =>
    promisify(Comment.find({ post: post.id })).then((result) => result),
  likes: (post) =>
    promisify(LikePost.find({ post: post.id })).then((result) => result),
};

module.exports = resolvers;
