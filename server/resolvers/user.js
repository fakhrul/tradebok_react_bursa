import { promisify } from "../helper";

const Post = require("../model/post");

const resolvers = {
  posts: (user) =>  promisify(Post.find({author: user.id})).then((result) => result),
};

module.exports = resolvers;
