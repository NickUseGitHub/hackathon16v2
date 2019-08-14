export default `
  type Query {
    highlightEntries: [Entry]
  }

  type Entry {
    id: ID!
    title: String
    thumbnail: String
    body: String
    url: String
  }
`
