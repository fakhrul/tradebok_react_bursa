const { gql } = require('apollo-server');

// Define your type definitions which be Query, and Player object types
const typeDefs = gql`
    type Query {
        players: [Player]
        getPlayer(id: String): Player
        users: [User]
        getUser(id: String): User
        userExist(authId: String): User
    }
    type Mutation {
        createPlayer(position: String, name: String, team: String, jerseyNumber: Int, wonSuperBowl: Boolean): Player
        updatePlayer(id: String, position: String, name: String, team: String, jerseyNumber: Int, wonSuperBowl: Boolean): Player
        deletePlayer(id: String): Player
        createUser(authId: String, avatar: String, name: String, email: String): User
        updateUser(id: String, authId: String, avatar: String, name: String, email: String): User
        deleteUser(id: String): User
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
        id: String
        authId: String
        avatar: String
        name: String
        email: String
        about: String
    }
    schema {
        query: Query
        mutation: Mutation
    }
`;

module.exports = typeDefs;
