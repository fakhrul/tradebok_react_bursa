import { promisify } from "../helper";
const User = require("../model/user");
const Comment = require("../model/comment");

const resolvers = {
    author: post => promisify(User.findById(post.author)),
    comments: (post) => promisify(Comment.find({post: post.id})).then((result) => result),
    likes: (user) => promisify(User.find({_id: user.id})).then((result) => result)
};

module.exports = resolvers;

