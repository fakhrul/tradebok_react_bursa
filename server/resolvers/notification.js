import { promisify } from "../helper";
const User = require("../model/user");

const resolvers = {
    user: notification => promisify(User.findById(notification.user)),
    actionUser: notification => promisify(User.findById(notification.actionUser)),
};

module.exports = resolvers;

