import get from 'lodash/get'
import fetchGql from '@utils/fetchGql'
import getCleanBody from '@utils/getCleanBody'

const query = `
query checkHoroFromName (
  $name: String!
  $lastname: String!
) {
  myHoroFromNameLastname (
    name: $name
    lastname: $lastname
  ) {
    title
    body
  }
}
`

export default async function checkHoroFromName(_, { name, lastname }) {
  const response = await fetchGql({
    query,
    variables: {
      name,
      lastname,
    },
  })

  const data = get(response, 'data.data.myHoroFromNameLastname')
  if (!data) return null
  const title = get(data, 'title')
  const body = get(data, 'body')

  return {
    title,
    body: getCleanBody(body),
  }
}
