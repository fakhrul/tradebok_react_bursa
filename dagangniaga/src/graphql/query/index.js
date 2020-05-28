import gql from "graphql-tag";


export const QUERY_POST = gql`
  query Post($id: String!) {
    post(id: $id) {
      author {
        id
        handle
        avatar
      }
      comments {
        id
        body
        author {
          id
          avatar
          handle
        }
        createdAt
      }
      uri
      likes {
        author {
          id
          handle
          avatar
          name
        }
      }
      caption
      createdAt
    }
  }
`;


export const QUERY_POSTS = gql`
  query Posts($userId: String!)  {
    posts(userId: $userId) {
      id
      uri
      caption
      createdAt
    }
  }
`;

export const QUERY_USER = gql`
 query GetUser($id: String!) {
    getUser(id: $id) {
      id
      avatar
      name
      email
      about
      followers {
        id
        handle
        name
        avatar
      }
      following {
        id
        handle
        name
        avatar
      }
      posts {
        id
        caption
        uri
        createdAt
      }
    }
  }
`;


export const QUERY_SEARCH_USERS = gql`
  query SearchUsers($userId: String!, $name: String!) {
    searchUsers(userId: $userId, name: $name) {
      id
      avatar
      name
      handle
    }
  }
`;

export const QUERY_USER_EXISTS = gql`
  query UserExist($email: String!) {
    userExist(email: $email){
      name
      id
    }
  }
`;


export const QUERY_LIKE_USERS = gql`
  query LikeUsers($likes: [String!]) {
    likeUsers(likes: $likes) {
      id
      avatar
      handle
      name
    }
  }
`;


export const QUERY_CHAT_EXISTS = gql`
  query ChatExists($userId: String!, $targetId: String!) {
    chatExists(userId: $userId, targetId: $targetId) {
      id
    }
  }
`;


export const QUERY_DOES_FOLLOW = gql`
  query DoesFollow($userId: String!, $targetId: String!) {
    doesFollow(userId: $userId, targetId: $targetId) {
      id
    }
  }
`;