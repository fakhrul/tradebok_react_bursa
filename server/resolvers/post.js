import { promisify } from "../helper";
const User = require("../model/user");

const resolvers = {
    author: post => promisify(User.findById(post.author))
};

module.exports = resolvers;

