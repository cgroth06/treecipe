import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation Mutation($input: UserInput!) {
  addUser(input: $input) {
    user {
      name
      _id
      # email
    }
    token
  }
}
`;

export const ADD_RECIPE = gql`
  mutation AddRecipe($input: RecipeInput!) {
    addRecipe(input: $input) {
      _id
      recipeTitle
      recipeText
      recipeAuthor
      createdAt
    }
  }
`;

export const REMOVE_RECIPE = gql`
  mutation removeRecipe($recipeId: ID!) {
    removeRecipe(recipeId: $recipeId) {
      _id
      recipeTitle
      recipeText
      recipeAuthor
      createdAt
      tags
    }
  }
`;

export const SAVE_TO_RECIPEBOX = gql`
  mutation saveToRecipeBox($recipeId: ID!) {
    saveToRecipeBox(recipeId: $recipeId) {
      _id
      recipeBox {
        _id
        recipeTitle
        recipeText
        recipeAuthor
        createdAt
        tags
      }
    }
  }
`;

export const REMOVE_FROM_RECIPEBOX = gql`
  mutation removeFromRecipeBox($recipeId: ID!) {
    removeFromRecipeBox(recipeId: $recipeId) {
      _id
      recipeBox {
        _id
        recipeTitle
        recipeText
        recipeAuthor
        createdAt
        tags
      }
    }
  }
`;

// export const ADD_COMMENT = gql`
//   mutation addComment($thoughtId: ID!, $commentText: String!) {
//     addComment(thoughtId: $thoughtId, commentText: $commentText) {
//       _id
//       thoughtText
//       thoughtAuthor
//       createdAt
//       comments {
//         _id
//         commentText
//         createdAt
//       }
//     }
//   }
// `;

export const FOLLOW_USER = gql`
mutation followUser($followId: ID!) {
  followUser(followId: $followId) {
    _id
    follows {
      _id
      name
      email
    }
  }
}
`;

export const UPDATE_RECIPE = gql`
  mutation updateRecipe($recipeId: ID!, $input: RecipeInput!) {
    updateRecipe(recipeId: $recipeId, input: $input) {
      _id
      recipeTitle
      recipeText
      recipeAuthor
      createdAt
      tags
    }
  }
`;