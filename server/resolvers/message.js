import { promisify } from "../helper";
const User = require("../model/user");
const Chat = require("../model/chat");

const resolvers = {
    author: message => promisify(User.findById(message.author)),
    chat: message => promisify(Chat.findById(message.chat)),
};

module.exports = resolvers;

