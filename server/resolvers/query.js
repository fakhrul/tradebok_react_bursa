const Player = require("../model/player");
const User = require("../model/user");

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
};

module.exports = resolvers;
