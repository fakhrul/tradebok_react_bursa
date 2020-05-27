import { promisify } from "../helper";

const Post = require("../model/post");
const User = require("../model/user");

const resolvers = {
  posts: (user) =>  promisify(Post.find({author: user.id})).then((result) => result),
  following: (user) => promisify(User.find({following: user.id})).then((result) => result),
  followers: (user) => promisify(User.find({followers: user.id})).then((result) => result),
};

module.exports = resolvers;
