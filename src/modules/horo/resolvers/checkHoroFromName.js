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

function getResultOnlyName(body) {
  if (!body) return body

  return getCleanBody(
    body
      .split('</p>')
      .slice(0, 3)
      .join(''),
  )
}

export default async function checkHoroFromName(_, { name }) {
  const response = await fetchGql({
    query,
    variables: {
      name,
      lastname: name,
    },
  })

  const data = get(response, 'data.data.myHoroFromNameLastname')
  if (!data) return null
  const title = get(data, 'title')
  const body = getResultOnlyName(get(data, 'body'))

  return {
    title,
    body,
  }
}
