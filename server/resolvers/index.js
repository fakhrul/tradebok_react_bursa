require("../connectors");
import Query from "./query";
import Mutation from "./mutation";
import DateTime from "./dateTime";
import Post from "./post";
import User from "./user";
import Comment from "./comment";
import Subscription from "./subscription";

const resolvers = {User, Post, Comment, Query, Mutation, Subscription};

console.log(resolvers);
module.exports = resolvers;
