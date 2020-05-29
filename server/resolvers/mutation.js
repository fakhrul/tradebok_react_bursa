import mongoose from "mongoose";
import { promisify } from "../helper";
import pubsub from "../pubsub";

const User = require("../model/user");
const Post = require("../model/post");
const Comment = require("../model/comment");
const LikePost = require("../model/likePost");
const Stock = require("../model/stock");
const StockComment = require("../model/stockComment");
const Chat = require("../model/chat");
const Message = require("../model/message");
const Notification = require("../model/notification");

const addPost = (id, caption, uri, authorId) =>
  new Promise((resolve, reject) => {
    Post.create({ caption, uri, author: authorId, _id: id }, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
const updateUserPostList = (userId, postId) =>
  new Promise((resolve, reject) => {
    User.update(
      { _id: userId },
      { $push: { posts: postId } },
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });

const addMessage = (messageId, chatId, authorId, body) =>
  new Promise((resolve, reject) => {
    Message.create(
      { _id: messageId, chat: chatId, author: authorId, body: body },
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });

const addMessageToList = (chatId, messageId) =>
  new Promise((resolve, reject) => {
    Chat.update(
      { _id: chatId },
      { $push: { messages: messageId } },
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });

const isHandleExist = (handleName) => {
  User.findOne({ handle: handleName }, (error, userFound) => {
    if (error) throw new Error(error);
    if (userFound) {
      console.log("user found");
      return true;
    } else {
      console.log("user not found");
      return false;
    }
  });
};

const generateUniqueAccountName = (proposedName) => {
  proposedName = proposedName.replace(/\W/g, "");
  User.findOne({ handle: proposedName }).exec(function (err, user) {
    if (err) throw new Error(err);
    if (user) {
      proposedName += Math.floor(Math.random() * 100 + 1);
      return generateUniqueAccountName(proposedName);
    }
    return proposedName;
  });
  return proposedName;
};

const addUserToFollowingList = (userId, targetId) =>
  new Promise((resolve, reject) => {
    User.update(
      { _id: userId },
      { $push: { followers: targetId } },
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });

const removeUserFromFollowingList = (userId, targetId) =>
  new Promise((resolve, reject) => {
    User.update(
      { _id: userId },
      { $pull: { followers: targetId } },
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });

const addTargetToFollowerList = (userId, targetId) =>
  new Promise((resolve, reject) => {
    User.update(
      { _id: targetId },
      { $push: { following: userId } },
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });

const removeTargetFromFollowerList = (userId, targetId) =>
  new Promise((resolve, reject) => {
    User.update(
      { _id: targetId },
      { $pull: { following: userId } },
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });

const resolvers = {
  //     updateFollowing(userId: String!, targetId: String!, action: String!) : User
  updateFollowing: (_, args) => {
    if (args.action === "FOLLOW") {
      Promise.all([
        addUserToFollowingList(args.userId, args.targetId),
        addTargetToFollowerList(args.userId, args.targetId),
      ]).then((result) => result[0]);
      return User.findById(
        { _id: args.targetId },
        async (error, userToReturn) => {
          if (error) throw new Error(error);

          const notificationId = mongoose.Types.ObjectId();
          Notification.create(
            {
              _id: notificationId,
              user: args.targetId,
              actionUser: args.userId,
              resourceId: args.targetId,
              type: "FOLLOW"
            }, (err, result) => {

            });
          return userToReturn;
        }
      );
    } else if (args.action === "UNFOLLOW") {
      Promise.all([
        removeUserFromFollowingList(args.userId, args.targetId),
        removeTargetFromFollowerList(args.userId, args.targetId),
      ]).then((result) => result[0]);
      return User.findById(
        { _id: args.targetId },
        async (error, userToReturn) => {
          if (error) throw new Error(error);
          return userToReturn;
        }
      );
    }
  },
  // followProfile: (_, args) => {
  //   return Promise.all([
  //     addProfileToFollowingList(args.userId, args.profileToFollowUserId),
  //     addProfileToFollowerList(args.userId, args.profileToFollowUserId),
  //   ]).then((result) => result[0]);
  // },
  //   unFollowProfile: (_, args) => {
  //     return Promise.all([
  //       removeProfileFromFollowingList(args.userId, args.profileToFollowUserId),
  //       removeProfileFromFollowerList(args.userId, args.profileToFollowUserId),
  //     ]).then((result) => result[0]);
  //   },
  createPlayer: (_, args) => {
    const newlyCreatedPlayer = new Player({
      name: args.name,
      position: args.position,
      team: args.team,
      jerseyNumber: args.jerseyNumber,
      wonSuperBowl: args.wonSuperBowl,
    });
    newlyCreatedPlayer.save();
    return newlyCreatedPlayer;
  },
  updatePlayer: (_, args) => {
    return Player.findByIdAndUpdate(
      { _id: args.id },
      { $set: args },
      async (error, playerUpdated) => {
        if (error) {
          throw new Error(error);
        }
        return await playerUpdated;
      }
    );
  },
  deletePlayer: (_, args) => {
    return Player.findByIdAndDelete(
      { _id: args.id },
      (error, playerDeleted) => {
        if (error) {
          throw new Error(error);
        }
        return;
      }
    );
  },
  createUser: (_, args) => {
    const handle = generateUniqueAccountName(args.name);
    return new Promise((resolve, reject) => {
      const id = mongoose.Types.ObjectId();
      User.create(
        {
          _id: id,
          avatar: args.avatar,
          name: args.name,
          email: args.email,
          handle: handle,
        },
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });

    // const handle = generateUniqueAccountName(args.name);
    // console.log("handle", handle);
    // if (!handle) throw new Error("failed to generate handle");
    // const newUser = new User({
    //   authId: args.authId,
    //   avatar: args.avatar,
    //   name: args.name,
    //   email: args.email,
    //   handle: handle,
    // });
    // newUser.save(function (err) {
    //   if (err) throw new Error(err);
    //   // const id = newUser._id; // Hey!
    // });
    // return newUser;
  },
  updateUser: (_, args) => {
    return User.findByIdAndUpdate(
      { _id: args.id },
      { $set: args },
      async (error, userUpdate) => {
        if (error) {
          throw new Error(error);
        }
        return await userUpdate;
      }
    );
  },
  deleteUser: (_, args) => {
    return user.findByIdAndDelete({ _id: args.id }, (error, userDeleted) => {
      if (error) {
        throw new Error(error);
      }
      return;
    });
  },
  createPost: (_, args) => {
    const id = mongoose.Types.ObjectId();
    return Promise.all([
      addPost(id, args.caption, args.uri, args.authorId),
      updateUserPostList(args.authorId, id),
    ]).then((result) => result[0]);
  },
  // deletePost(id: String!): Post
  // editPost(id: String!, caption: String!): Post
  deletePost: (_, args) => {
    const result = Post.findByIdAndDelete({ _id: args.id }, (error, obj) => {
      if (error) {
        throw new Error(error);
      }
    });
    return result;
  },
  editPost: (_, args) => {
    return Post.findByIdAndUpdate(
      { _id: args.id },
      { caption: args.caption },
      (error, postUpdated) => {
        if (error) {
          throw new Error(error);
        }
        pubsub.publish("post", { post: postUpdated });
        return postUpdated;
      }
    );
  },
  addComment: (_, args) => {
    const result = new Promise((resolve, reject) => {
      const id = mongoose.Types.ObjectId();
      Comment.create(
        {
          _id: id,
          author: args.userId,
          post: args.postId,
          body: args.body,
        },
        (err, result) => {
          if (err) reject(err);
          else {
            const notificationId = mongoose.Types.ObjectId();
            Notification.create(
              {
                _id: notificationId,
                user: result.author._id,
                actionUser: args.userId,
                resourceId: args.postId,
                type: "COMMENT"
              }, (err, result) => {
  
              });

            resolve(result)
          }
        }
      );
    });

    Post.findById(args.postId, function (err, post) {
      if (!err) {
        // pubsub.publish("postUpdated", { postUpdated: "aj" });
        pubsub.publish("post", { post: post });
      }
    });
    return result;
  },
  deleteComment: (_, args) => {
    const result = Comment.findByIdAndDelete(
      { _id: args.commentId },
      (error, obj) => {
        if (error) {
          throw new Error(error);
        }
      }
    );

    Post.findById(args.postId, function (err, post) {
      if (!err) {
        // pubsub.publish("postUpdated", { postUpdated: "aj" });
        pubsub.publish("post", { post: post });
      }
    });

    return result;
  },
  deleteLike: (_, args) => {
    const likePost = new Promise((resolve, reject) => {
      LikePost.deleteMany(
        { post: args.postId, author: args.userId },
        (error, obj) => {
          if (error) {
            reject(error);
          } else {
            resolve(obj);
          }
        }
      );
    });

    Post.findById(args.postId, function (err, post) {
      if (!err) {
        pubsub.publish("post", { post: post });
      }
    });

    return likePost;
  },
  addLike: (_, args) => {
    const likePost = new Promise((resolve, reject) => {
      const id = mongoose.Types.ObjectId();
      LikePost.create(
        {
          _id: id,
          author: args.userId,
          post: args.postId,
        },
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
    Post.findById(args.postId, function (err, post) {
      if (!err) {
        pubsub.publish("post", { post: post });
        const notificationId = mongoose.Types.ObjectId();
        Notification.create(
          {
            _id: notificationId,
            user: post.author._id,
            actionUser: args.userId,
            resourceId: args.postId,
            type: "LIKE"
          }, (err, result) => {

          }

        )
      }
    });

    return likePost;
  },
  addStock: (_, args) => {
    return new Promise((resolve, reject) => {
      const id = mongoose.Types.ObjectId();
      Stock.create(
        {
          _id: id,
          name: args.name,
        },
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },
  addStockComment: (_, args) => {
    return new Promise((resolve, reject) => {
      const id = mongoose.Types.ObjectId();
      StockComment.create(
        {
          _id: id,
          stock: args.stockId,
          body: args.body,
        },
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },
  createTemporaryChat: (_, args) => {
    return new Promise((resolve, reject) => {
      const id = mongoose.Types.ObjectId();
      Chat.create(
        {
          _id: id,
        },
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },
  // connectChatToUsers(chatId: String!, userId: String!, targetId: String!) : Chat!
  connectChatToUsers: (_, args) => {
    return new Promise((resolve, reject) => {
      var foundUser = null;
      var foundTarget = null;
      User.findByIdAndUpdate(
        { _id: args.userId },
        { $push: { chats: args.chatId } },
        (err, user) => {
          if (err) throw Error(err);
          const foundUser = user;
          User.findByIdAndUpdate(
            { _id: args.targetId },
            { $push: { chats: args.chatId } },
            (err, user) => {
              if (err) throw Error(err);
              const foundTarget = user;
              Chat.update(
                { _id: args.chatId },
                {
                  $push: {
                    participants: { $each: [foundUser._id, foundTarget._id] },
                  },
                },
                (err, result) => {
                  if (err) reject(err);
                  else resolve(result);
                }
              );
            }
          );
        }
      );
    });
  },
  // deleteChat(chatId: $String): Chat!
  deleteChat: (_, args) => {
    return Chat.findByIdAndDelete(
      { _id: args.chatId },
      (error, chatDeleted) => {
        if (error) {
          throw new Error(error);
        }
        return chatDeleted;
      }
    );
  },
  // addChatMessage( chatId: $chatId, authorId: $authorId, body: $body ): Message!
  addChatMessage: (_, args) => {
    const messageId = mongoose.Types.ObjectId();
    Promise.all([
      addMessage(messageId, args.chatId, args.authorId, args.body),
      addMessageToList(args.chatId, messageId),
    ]).then((result) => result[0]);
    return Chat.findById({ _id: args.chatId }, async (error, chatToReturn) => {
      if (error) throw new Error(error);
      pubsub.publish("chat", { chat: chatToReturn });
      return chatToReturn;
    });
  },
  // messageSeen(messageId: String!) : Message
  messageSeen: (_, args) => { },
  // updateLastSeen(userId: String!) : User!
  updateLastSeen: (_, args) => {
    return User.findByIdAndUpdate(
      { _id: args.userId },
      { lastSeen: Date.now },
      async (error, userUpdate) => {
        if (error) {
          throw new Error(error);
        }
        return await userUpdate;
      }
    );
  },
};

export default resolvers;
