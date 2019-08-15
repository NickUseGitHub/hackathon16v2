import { GraphQLServer } from 'graphql-yoga'
import path from 'path'
import get from 'lodash/get'
import { fileLoader, mergeTypes } from 'merge-graphql-schemas'

const typesArray = fileLoader(path.join(__dirname, './**/schema.js'))
const typeMergedDefs = mergeTypes(typesArray)

const resolvers = fileLoader(path.join(__dirname, './**/resolvers.js'))

const middlewares = [
  // function logger(resolve, parent, args, ctx, info) {
  //   const reqHeaders = get(ctx, 'req.request.headers')
  //   const ip = get(reqHeaders, 'x-forwarded-for')
  //   const reqUrl = get(reqHeaders, 'origin')
  //   const userAgent = get(reqHeaders, 'user-agent')
  //   console.log('------ incoming info ------')
  //   console.log('ip:', ip)
  //   console.log('reqUrl:', reqUrl)
  //   console.log('userAgent:', userAgent)
  //   return resolve(parent, args, ctx, info)
  // },
]

export default new GraphQLServer({
  typeDefs: typeMergedDefs,
  resolvers,
  context: req => ({ req }),
  middlewares,
})
