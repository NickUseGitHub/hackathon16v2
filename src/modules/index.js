import { GraphQLServer } from 'graphql-yoga'

const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`

const resolvers = {
  Query: {
    hello: () => 'hello world',
  },
}

export default new GraphQLServer({ typeDefs, resolvers })
