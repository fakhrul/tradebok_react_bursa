import { promisify } from "../helper";
const User = require("../model/user");
const Post = require("../model/post");

const resolvers = {
  author: (likePost) => promisify(User.findById(likePost.author)),
  post: (likePost) => promisify(Post.findById(likePost.post))
};

module.exports = resolvers;
