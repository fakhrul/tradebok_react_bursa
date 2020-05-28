require("../connectors");
import Query from "./query";
import Mutation from "./mutation";
import DateTime from "./dateTime";
import Post from "./post";
import User from "./user";
import Comment from "./comment";
import Subscription from "./subscription";
import LikePost from "./likePost"
import Stock from "./stock";
import Message from "./message";
import Chat from "./chat";

const resolvers = {User, Post, Comment, LikePost, Query, Stock, Message, Chat,  Mutation, Subscription};

console.log(resolvers);
module.exports = resolvers;
