import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($name: String!) {
    user(name: $name) {
      _id
      name
      email
      compositions {
        _id
        compositionText
        createdAt
      }
    }
  }
`;

export const QUERY_COMPOSITIONS = gql`
  query getCompositions {
    compositions {
      _id
      compositionText
      compositionAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_COMPOSITION = gql`
  query getSingleThought($thoughtId: ID!) {
    thought(thoughtId: $thoughtId) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      # comments {
      #   _id
      #   commentText
      #   commentAuthor
      #   createdAt
      # }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      email
      compositions {
        _id
        compositionText
        compositionAuthor
        createdAt
      }
    }
  }
`;
