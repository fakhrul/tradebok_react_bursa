const Player = require('./connectors');

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

        }
    }
}

module.exports = resolvers;
