import gql from "graphql-tag";

export const QUERY_USER = gql`
 query GetUser($id: String!) {
    getUser(id: $id) {
      id
      authId
      avatar
      name
      email
      about
      followingIds
      followerIds
    }
  }
`;

export const QUERY_USER_EXISTS = gql`
  query UserExist($authId: String!) {
    userExist(authId: $authId){
      name
      id
    }
  }
`;
