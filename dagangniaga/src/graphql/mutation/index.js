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

export const MUTATION_CREATE_POST = gql`
  mutation CreatePost($authorId: String!, $uri: String, $caption: String) {
    createPost(authorId: $authorId, uri: $uri, caption: $caption) {
      id
    }
  }
`;

