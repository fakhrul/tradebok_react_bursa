const { gql } = require("apollo-server");

// Define your type definitions which be Query, and Player object types
const typeDefs = gql`
  scalar DateTime
  type Query {
    players: [Player]
    getPlayer(id: String): Player
    user(id: ID!): User
    users: [User]
    searchUsers(userId: String!, name: String!): [User]
    getUser(id: String): User
    userExist(email: String!): User
    post(id: String): Post
    posts(userId: String!): [Post]
    comment(id: String): Comment
    comments(postId: String): [Comment]
    likes(postId: String): [LikePost]
    stock(id: String!): Stock
    stockComments(stockId: String!): StockComment
    doesFollow(userId: String!, targetId: String!): User
  }
  type Subscription {
    post(id: String!): Post
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
    createUser(email: String!, name: String!, avatar: String): User
    updateUser(id: String, name: String, email: String, avatar: String): User
    deleteUser(id: String): User
    followProfile(userId: String, profileToFollowUserId: String): User
    createPost(caption: String, uri: String, authorId: String): Post
    deletePost(id: String!): Post
    editPost(id: String!, caption: String!): Post
    addComment(userId: String!, postId: String!, body: String!): Comment
    deleteComment(postId: String!, commentId: String!): Comment
    addLike(userId: String!, postId: String!): LikePost!
    deleteLike(userId: String!, postId: String!): LikePost
    addStock(name: String!): Stock!
    addStockComment(stockId: String!, body: String!): StockComment!
    updateFollowing(userId: String!, targetId: String!, action: String!): User
  }
  type Stock {
    id: ID!
    name: String!
    stockComments: [StockComment]
  }
  type StockComment {
    id: ID!
    stock: Stock
    body: String!
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
    likePost: [Post]!
    likeComment: [Comment]!
  }
  type Post {
    id: ID!
    caption: String
    uri: String
    reports: Int!
    author: User!
    comments: [Comment]
    createdAt: DateTime!
    likes: [LikePost]
  }
  type Comment {
    id: ID!
    body: String!
    author: User!
    post: Post!
    createdAt: DateTime!
  }
  type LikePost {
    id: ID!
    author: User!
    post: Post!
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
    subscription: Subscription
  }
`;

module.exports = typeDefs;
