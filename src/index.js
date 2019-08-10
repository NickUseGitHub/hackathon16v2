import { GraphQLServer } from 'graphql-yoga'

const port = 3000

const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
  },
}

const server = new GraphQLServer({ typeDefs, resolvers })
server.start({
  port
}, () => console.log(`Server is running on localhost:${port}`))