const typeDefs = `
  type User {
    _id: ID
    name: String
    email: String
    password: String
    compositions: [Composition]!
  }

  type Composition {
    _id: ID
    compositionText: String
    compositionAuthor: String
    createdAt: String
    /* comments: [Comment]! */
  }

  /* type Comment {
    _id: ID
    commentText: String
    createdAt: String
  } */

  input CompositionInput {
    compositionText: String!
    compositionAuthor: String!
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
  }
  
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(name: String!): User
    compositions: [Composition]!
    composition(compositionId: ID!): Composition
    me: User
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    addComposition(input: CompositionInput!): Composition
    /* addComment(compositionId: ID!, commentText: String!): Composition */
    removeComposition(compositionId: ID!): Composition
    /* removeComment(compositionId: ID!, commentId: ID!): Composition */
  }
`;

export default typeDefs;
