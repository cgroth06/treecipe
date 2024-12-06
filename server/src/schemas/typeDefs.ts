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
    compositionTitle: String
    compositionText: String
    compositionAuthor: String
    tags: [String]
    createdAt: String
  }

  input CompositionInput {
    compositionText: String!
    compositionAuthor: String!
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
  }

  input FollowInput {
    followId: ID!
  }

  input CollectionInput {
    compositionId: ID!
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
    removeComposition(compositionId: ID!): Composition
    addToCollection(input: CollectionInput!): User
    removeFromCollection(compositionId: ID!): User
    addToFollows(input: FollowInput!): User
    unfollowUser(followId: ID!): User
  }
`;

export default typeDefs;
