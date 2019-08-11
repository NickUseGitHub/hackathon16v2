import { GraphQLServer } from 'graphql-yoga'
import path from 'path'
import { fileLoader, mergeTypes } from 'merge-graphql-schemas'

const typesArray = fileLoader(path.join(__dirname, './**/schema.js'))
const typeMergedDefs = mergeTypes(typesArray)

const resolvers = fileLoader(path.join(__dirname, './**/resolvers.js'))

export default new GraphQLServer({ typeDefs: typeMergedDefs, resolvers })
