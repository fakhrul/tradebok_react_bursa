import { promisify } from "../helper";
const Message = require("../model/message");
const User = require("../model/user");

const resolvers = {
  participants: (chat) =>
    promisify(User.find({chats: chat.id})).then((result) => result),
  messages: (chat) =>
    promisify(Message.find({ chat: chat.id })).then((result) => result),
};

module.exports = resolvers;
