export default `
  type Query {

    checkHoroFromDay(day: Day!): Entry

    checkHoroFromName(
      name: String!
      lastname: String!
    ): HoroFromNameResult

  }

  type HoroFromNameResult {
    title: String
    body: String
  }
`
