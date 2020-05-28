import { promisify } from "../helper";
const Message = require("../model/message");

const resolvers = {
    messages: (chat) =>
        promisify(Message.find({ chat: chat.id })).then((result) => result),
};

module.exports = resolvers;
