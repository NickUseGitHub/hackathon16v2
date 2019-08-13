import { GraphQLServer } from 'graphql-yoga'
import path from 'path'
import { fileLoader, mergeTypes } from 'merge-graphql-schemas'

const typesArray = fileLoader(path.join(__dirname, './**/schema.js'))
const typeMergedDefs = mergeTypes(typesArray)

const resolvers = fileLoader(path.join(__dirname, './**/resolvers.js'))

const middlewares = [
  function logger(resolve, parent, args, ctx, info) {
    console.log('ctx', ctx.req.request.body)

    return resolve(parent, args, ctx, info)
  },
]

export default new GraphQLServer({
  typeDefs: typeMergedDefs,
  resolvers,
  context: req => ({ req }),
  middlewares,
})
