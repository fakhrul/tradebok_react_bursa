import { promisify } from "../helper";

const Player = require("../model/player");
const User = require("../model/user");
const Post = require("../model/post");

const resolvers = {
  players: () =>
    Player.find({}, (error, players) => {
      if (error) throw new Error(error);
      console.log("players-------", players);
      return players;
    }),
  getPlayer: (_, args) =>
    Player.findById({ _id: args.id }, async (error, playerToReturn) => {
      if (error) throw new Error(error);
      return await playerToReturn;
    }),
  users: () =>
    User.find({}, (error, users) => {
      if (error) throw new Error(error);
      return users;
    }),
  user: (_, args) => promisify(User.findById(args.id)),
  getUser: (_, args) =>
    User.findById({ _id: args.id }, async (error, userToReturn) => {
      if (error) throw new Error(error);
      return userToReturn;
    }),
  userExist: (_, args) =>
    User.findOne({ authId: args.authId }, async (error, userToReturn) => {
      if (error) throw new Error(error);
      return userToReturn;
    }),
  post: (_, args) => promisify(Post.findById(args.id)).then((result) => result),
  // Post.findById({ _id: args.id }, async (error, data) => {
  //   if (error) throw new Error(error);
  //   return data;
  // }),
  posts: (_, args) => promisify(Post.find({})).then((result) => result),
};

module.exports = resolvers;
