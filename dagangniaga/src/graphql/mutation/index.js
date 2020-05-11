import gql from "graphql-tag";

export const MUTATION_CREATE_USER = gql`
    mutation CreateUser($authId: String!, $avatar: String, $name: String!, $email: String!){
        createUser(authId: $authId, avatar:$avatar, name: $name, email: $email ) {
            authId,
            avatar,
            name,
            email
        }
    }
`;
