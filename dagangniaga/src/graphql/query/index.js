import gql from "graphql-tag";

export const QUERY_USER = gql`
 query User($authId: String!) {
    user(authId: $authId) {
      id
      authId
      avatar
      name
      email
      about
    }
  }
`;

export const QUERY_USER_EXISTS = gql`
  query UserExist($authId: String!) {
    userExist(authId: $authId){
      name
    }
  }
`;
