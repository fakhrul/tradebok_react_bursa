import pubsub from "../pubsub";
const { withFilter } = require("apollo-server");

const resolvers = {
  // postUpdated: {
  //   subscribe: () => pubsub.asyncIterator(["postUpdated"]),
  // },
  post: {
    subscribe: withFilter(
      () => pubsub.asyncIterator(["post"]),
      (payload, args) => {
        return !args.id || payload.post.id === args.id;
      }
    ),
    // resolve: (payload) => ({
    //   id: payload.post.id,

    // }),
  },
};

module.exports = resolvers;
