import { GraphQLServer } from 'graphql-yoga'
import get from 'lodash/get'
import axios from 'axios'

const port = 3000

const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`

const resolvers = {
  Query: {
    hello: async (_, { name }) => {
      const result = await axios({
        method: 'post',
        url: 'http://localhost/',
        data: {
          query: "{ ping }"
        }
      })

      const retMsg = get(result, 'data.data.ping')

      return `hello ${retMsg}`
    },
  },
}

const server = new GraphQLServer({ typeDefs, resolvers })
server.start({
  port
}, () => console.log(`Server is running on localhost:${port}`))