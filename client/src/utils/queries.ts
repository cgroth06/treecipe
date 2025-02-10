import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($name: String!) {
    user(name: $name) {
      _id
      name
      email
      recipes {
        _id
        recipeTitle
        reipeText
        reipeAuthor
        createdAt
        tags
      }
    }
  }
`;

export const QUERY_RECIPES = gql`
  query getRecipes {
    recipes {
      _id
      recipeTitle
      recipeText
      recipeAuthor
      createdAt
      tags
    }
  }
`;

export const QUERY_SINGLE_RECIPE = gql`
  query getSingleRecipe($recipeId: ID!) {
    recipe(recipeId: $recipeId) {
      _id
      recipeTitle
      recipeText
      recipeAuthor
      createdAt
      tags
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
    recipes {
      _id
      recipeTitle
      recipeText
      recipeAuthor
      createdAt
      tags
    }
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

export const SEARCH_RECIPES_AND_USERS = gql`
  query SearchRecipesAndUsers($query: String!) {
    searchRecipesAndUsers(query: $query) {
      users {
        _id
        name
        email
      }
      recipes {
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

export const CHECK_RECIPEBOX_STATUS = gql`
  query checkRecipeBoxStatus($recipeId: ID!) {
    checkRecipeBoxStatus(recipeId: $recipeId) {
      inRecipeBox
    }
  }
`;