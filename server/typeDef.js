const { gql } = require('apollo-server');

// Define your type definitions which be Query, and Player object types
const typeDefs = gql`
    type Query {
        players: [Player]
        getPlayer(id: String): Player
    }
    type Mutation {
        createPlayer(position: String, name: String, team: String, jerseyNumber: Int, wonSuperBowl: Boolean): Player
        updatePlayer(id: String, position: String, name: String, team: String, jerseyNumber: Int, wonSuperBowl: Boolean): Player
        deletePlayer(id: String): Player
    }
    type Player {
        id: String
        position: String
        name: String
        team: String
        jerseyNumber: Int
        wonSuperBowl: Boolean
    }
    schema {
        query: Query
        mutation: Mutation
    }
`;

module.exports = typeDefs;
