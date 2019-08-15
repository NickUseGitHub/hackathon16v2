import graphQlModules from './modules'

const port = 3002

const server = graphQlModules
server.start(
  {
    port,
  },
  () => console.log(`Server is running on localhost:${port}`),
)
