require('./connectors');
const Player = require("./model/player");
const User = require("./model/user");

const resolvers = {
    Query: {
        players: () => Player.find({}, (error, players) => {
            if(error) throw new Error(error);
            console.log('players-------', players);
            return players;
        }),
        getPlayer: (_, args) => Player.findById({_id: args.id}, async (error, playerToReturn) => {
            if(error) throw new Error(error);
            return await playerToReturn;
        }),
        users: () => User.find({}, (error, users) => {
            if(error)
                throw new Error(error);
            return users;
        }),
        getUser: (_, args) => User.findById({_id: args.id}, async(error, userToReturn) => {
            if(error) 
                throw new Error(error);
            return userToReturn;
        }),
        userExist: (_, args) => User.findOne({authId: args.authId}, async(error, userToReturn) => {
            if(error)
                throw new Error(error);
            return userToReturn;
        })
    },
    Mutation: {
        createPlayer: (_, args) => {
            const newlyCreatedPlayer = new Player({
                name: args.name,
                position: args.position,
                team: args.team,
                jerseyNumber: args.jerseyNumber,
                wonSuperBowl: args.wonSuperBowl
            });   
            newlyCreatedPlayer.save();
            return newlyCreatedPlayer;
        },
        updatePlayer: (_, args) => {
            return Player.findByIdAndUpdate({_id: args.id}, {$set: args}, async (error, playerUpdated) => {
                if (error) {
                    throw new Error(error);
                }
                return await playerUpdated;
            });
        },
        deletePlayer: (_, args) => {
            return Player.findByIdAndDelete({_id: args.id}, (error, playerDeleted) => {
                if(error) {
                    throw new Error(error);
                    
                }
                return;
            });
        },
        createUser: (_, args) => {
            const newUser = new User({
                authId: args.authId,
                avatar: args.avatar,
                name: args.name,
                email: args.email
            });
            newUser.save();
        },
        updateUser: (_, args) => {
            return User.findByIdAndUpdate({_id: args.id}, {$set: args}, async (error, userUpdate) => {
                if(error){
                    throw new Error(error);
                }
                return await userUpdate;
            })
        },
        deleteUser: (_, args) => {
            return user.findByIdAndDelete({_id: args.id}, (error, userDeleted)=> {
                if(error){
                    throw new Error(error);
                }
                return;
            })
        }
    }
}

module.exports = resolvers;
