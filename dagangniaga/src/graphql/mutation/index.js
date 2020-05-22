import gql from "graphql-tag";

export const MUTATION_CREATE_USER = gql`
  mutation CreateUser(
    $authId: String!
    $avatar: String
    $name: String!
    $email: String!
  ) {
    createUser(authId: $authId, avatar: $avatar, name: $name, email: $email) {
      authId
      avatar
      name
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

export const MUTATION_REPORT_POST = gql`
  mutation ReportPost($postId: String!) {
    reportPost(postId: $postId) {
      id
    }
  }
`;

export const MUTATION_EDIT_POST = gql`
  mutation EditPost($postId: String!, $caption: String!) {
    editPost(postId: $postId, caption: $caption) {
      id
    }
  }
`;

export const MUTATION_DELETE_POST = gql`
  mutation DeletePost($postId: String!) {
    deletePost(postId: $postId) {
      id
    }
  }
`;

// export const QUERY_LIKE_USERS = gql`
//   query LikeUsers($likes: [String!]) {
//     likeUsers(likes: $likes) {
//       id
//       avatar
//       handle
//       name
//     }
//   }
// `;


export const MUTATION_LIKE_INTERACTION = gql`
  mutation LikeInteraction($postId: String!, $userId: String!, $action: String!) {
    likeInteraction(postId: $postId, userId: $userId, action: $action) {
      id
    }
  }
`;


export const MUTATION_ADD_COMMENT = gql`
  mutation AddComment($userId: String!, $postId: String!, $body: String!) {
    addComment(userId: $userId, postId: $postId, body: $body) {
      id
    }
  }
`;


export const MUTATION_DELETE_COMMENT = gql`
  mutation DeleteComment($postId: String!, $commentId: String!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
    }
  }
`;
