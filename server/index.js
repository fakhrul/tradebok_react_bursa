require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./typeDef");
const resolvers = require("./resolves");
const PORT = 4000;

const server = new ApolloServer({ resolvers, typeDefs });

server
  .listen({ port: PORT })
  .then(({ url }) => console.log("listening on " + url));
