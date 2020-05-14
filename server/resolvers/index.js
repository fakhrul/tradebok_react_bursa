require("../connectors");
import Query from "./query";
import Mutation from "./mutation";
import DateTime from "./dateTime";
import Post from "./post";
import User from "./user";

const resolvers = {User, Post, Query, Mutation};

module.exports = resolvers;
