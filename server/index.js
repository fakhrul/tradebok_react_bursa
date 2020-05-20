require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./typeDef");
const resolvers = require("./resolvers");
const PORT = 4000;

// export const pubsub = new PubSub();

const server = new ApolloServer({
  resolvers,
  typeDefs,
  tracing: true,
  subscriptions: true,
  // subscriptions: {
  //   onConnect: (connectionParams, webSocket) => {
  //     if (connectionParams.authToken) {
  //       // return validateToken(connectionParams.authToken)
  //       //   .then(findUser(connectionParams.authToken))
  //       //   .then((user) => {
  //       //     return {
  //       //       currentUser: user,
  //       //     };
  //       //   });
  //     }

  //     // throw new Error('Missing auth token!');
  //   },
  // },
});

// server
//   .listen({ port: PORT })
//   .then(({ url }) => console.log("listening on " + url));

// const validateToken = authToken => {
//   // ... validate token and return a Promise, rejects in case of an error
// };

// const findUser = authToken => {
//   return tokenValidationResult => {
//     // ... finds user by auth token and return a Promise, rejects in case of an error
//   };
// };

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   subscriptions: {
//     onConnect: (connectionParams, webSocket) => {
//       if (connectionParams.authToken) {
//         return validateToken(connectionParams.authToken)
//           .then(findUser(connectionParams.authToken))
//           .then(user => {
//             return {
//               currentUser: user,
//             };
//           });
//       }

//       // throw new Error('Missing auth token!');
//     },
//   },
// });

server.listen({ port: PORT }).then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});
