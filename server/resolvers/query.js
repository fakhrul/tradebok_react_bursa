import { promisify } from "../helper";

const Player = require("../model/player");
const User = require("../model/user");
const Post = require("../model/post");
const Comment = require("../model/comment");
const LikePost = require("../model/likePost");
const Stock = require("../model/stock");
const StockComment = require("../model/stockComment");

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
  // searchUsers(userId: String!, name: String!): [User]
  searchUsers: (_, args) => promisify(User.find({})).then((result) => result),
  userExist: (_, args) =>
    User.findOne({ email: args.email }, async (error, userToReturn) => {
      if (error) throw new Error(error);
      return userToReturn;
    }),
  post: (_, args) => promisify(Post.findById(args.id)).then((result) => result),
  posts: (_, args) =>
    promisify(Post.find({}).sort({ createdAt: "desc" })).then(
      (result) => result
    ),
  comment: (_, args) =>
    promisify(Comment.findById(args.id)).then((result) => result),
  comments: (_, args) =>
    promisify(Comment.find({ post: args.postId })).then((result) => result),
  likes: (_, args) =>
    promisify(LikePost.find({ post: args.postId })).then((result) => result),
  stock: (_, args) =>
    promisify(Stock.findById(args.id)).then((result) => result),
  stockComments: (_, args) =>
    promisify(StockComment.find({ stock: args.stockId })).then(
      (result) => result
    ),
  doesFollow: (_, args) =>
    promisify(User.findOne({ _id: args.userId, following: args.targetId })),
};

module.exports = resolvers;
