const { gql } = require("apollo-server");

// Link schema should have an ID, the input Url, and the desired slug
// queries should include grabbing a single link & grabbing all links
// mutations: creating a link
const typeDefs = gql`
  type Link {
    id: Int
    url: String!
    slug: String!
  }
  # defining queries
  type Query {
    link(id: Int!): Link
    allLinks: [Link!]!
  }

  type Mutation {
    createLink(url: String!, slug: String!): Link!
  }
`;

module.exports = typeDefs;
