const typeDefs = `
  type User {
    _id: ID
    name: String
    email: String
    password: String
    recipes: [Recipe]!
    recipeBox: [Recipe]!
    follows: [User]!
  }

  type Recipe {
    _id: ID
    recipeTitle: String
    recipeText: String
    recipeAuthor: String
    tags: [String]
    createdAt: String
  }
  
  type Auth {
    token: ID!
    user: User
  }

  type SearchResults {
    users: [User]
    recipes: [Recipe]
  }

  input RecipeInput {
    recipeTitle: String
    recipeText: String!
    recipeAuthor: String!
    tags: [String]
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
  }

  input FollowInput {
    followId: ID!
  }

  input RecipeBoxInput {
    recipeId: ID!
  }

  type RecipeBoxStatus {
    inRecipeBox: Boolean
  }

  type Query {
    users: [User]
    user(name: String!): User
    recipes: [Recipe]!
    recipe(recipeId: ID!): Recipe
    me: User
    searchRecipesAndUsers(query: String): SearchResults
    checkRecipeBoxStatus(recipeId: ID!): RecipeBoxStatus
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    addRecipe(input: RecipeInput!): Recipe
    removeRecipe(recipeId: ID!): Recipe
    updateRecipe(recipeId: ID!, input: RecipeInput!): Recipe
    saveToRecipeBox(recipeId: ID!): User
    removeFromRecipeBox(recipeId: ID!): User
    followUser(input: FollowInput!): User
    unfollowUser(followId: ID!): User
  }
`;

export default typeDefs;
