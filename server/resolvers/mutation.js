import mongoose from "mongoose";
import { promisify } from "../helper";
import pubsub from "../pubsub";

const User = require("../model/user");
const Post = require("../model/post");
const Comment = require("../model/comment");
const LikePost = require("../model/likePost");
const Stock = require("../model/stock");
const StockComment = require("../model/stockComment");

const addProfileToFollowingList = (userId, profileToFollowUserId) =>
  new Promise((resolve, reject) => {
    User.update(
      { _id: userId },
      { $push: { followingIds: profileToFollowUserId } },
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });

const addProfileToFollowerList = (userId, profileToFollowUserId) =>
  new Promise((resolve, reject) => {
    User.update(
      { _id: profileToFollowUserId },
      { $push: { followerIds: userId } },
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });

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

// const addProfileToFollowerList = (userId, profileToFollowUserId) =>
// new Promise((resolve, reject) => {
//   User.update(
//     { _id: profileToFollowUserId },
//     { $push: { followerIds: userId } },
//     (err, result) => {
//       if (err) reject(err);
//       else resolve(result);
//     }
//   );
// });

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

const resolvers = {
  followProfile: (_, args) => {
    return Promise.all([
      addProfileToFollowingList(args.userId, args.profileToFollowUserId),
      addProfileToFollowerList(args.userId, args.profileToFollowUserId),
    ]).then((result) => result[0]);
  },
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
          else resolve(result);
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
  // likeInteraction(userId: String!, postId: String!, action: LikeAction!): Post!
  // likeInteraction: (_, args) => {
  //   console.log(args.action);
  //   if (args.action === "LIKE") {

  //     Post.findOneAndUpdate({_id: args.postId}, {$push:{likes:args.userId}}, {new: true}, (err, post) => {
  //       if (err) {
  //         throw new Error(err);
  //       }
  //       console.log(post);
  //       return post;
  //     });

  //     // const post = promisify(
  //     //   Post.update({ _id: args.postId }, { $push: { likes: args.userId } })
  //     // ).then((result) => result);
  //     // console.log(post);
  //     // return post;
  //   } else {
  //     return promisify(
  //       Post.update({ _id: args.postId }, { $pull: { likes: args.userId } })
  //     ).then((result) => result);
  //   }
  // new Promise((resolve, reject) => {
  //   User.update(
  //     { _id: userId },
  //     { $push: { posts: postId } },
  //     (err, result) => {
  //       if (err) reject(err);
  //       else resolve(result);
  //     }
  //   );
};

export default resolvers;
