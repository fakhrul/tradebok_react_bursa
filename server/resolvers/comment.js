import { promisify } from "../helper";
const User = require("../model/user");
const Post = require("../model/post");

const resolvers = {
    author: comment => promisify(User.findById(comment.author)),
    post: comment => promisify(Post.findById(comment.post)),
};

module.exports = resolvers;

