const { gql } = require("apollo-server");

// Define your type definitions which be Query, and Player object types
const typeDefs = gql`
  scalar DateTime
  type Query {
    players: [Player]
    getPlayer(id: String): Player
    user(id: ID!): User
    users: [User]
    getUser(id: String): User
    userExist(authId: String): User
    post(id: ID!): Post
    posts: [Post!]!
  }
  type Mutation {
    createPlayer(
      position: String
      name: String
      team: String
      jerseyNumber: Int
      wonSuperBowl: Boolean
    ): Player
    updatePlayer(
      id: String
      position: String
      name: String
      team: String
      jerseyNumber: Int
      wonSuperBowl: Boolean
    ): Player
    deletePlayer(id: String): Player
    createUser(
      authId: String!
      avatar: String
      name: String!
      email: String!
    ): User
    updateUser(
      id: String
      authId: String
      avatar: String
      name: String
      email: String
    ): User
    deleteUser(id: String): User
    followProfile(userId: String, profileToFollowUserId: String): User
    createPost(caption: String, uri: String, reports: Int, authorId: String): Post
  }
  type Player {
    id: String
    position: String
    name: String
    team: String
    jerseyNumber: Int
    wonSuperBowl: Boolean
  }
  type User {
    id: ID!
    token: String!
    fcmToken: String
    authId: String!
    avatar: String
    name: String!
    email: String!
    handle: String
    about: String
    lastSeen: Float!
    following: [User]
    followers: [User]
    followingIds: [String]
    followerIds: [String]
    posts: [Post]!
    chats: [Chat]!
    notifications: [Notification!]
  }
  type Post {
    id: ID!
    caption: String
    uri: String
    reports: Int!
    author: User!
  }
  type Comment {
    id: String
    body: String!
    author: User!
  }
  type Notification {
    id: String
    resourceId: String!
    user: User!
    actionUser: User!
    type: NotificationType!
  }
  enum NotificationType {
    FOLLOW
    COMMENT
    LIKE
  }
  type Message {
    id: String
    type: MessageType!
    asset: String
    body: String
    seen: Boolean
    author: User!
  }
  enum MessageType {
    TEXT
    IMAGE
    VIDEO
  }
  type BlockList {
    id: String
    from: String!
    to: String!
  }

  type Chat {
    id: String
    participants: [User!]
    messages(last: Int): [Message!]
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

module.exports = typeDefs;
