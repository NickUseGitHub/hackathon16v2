import get from 'lodash/get'
import fetchGql from '@utils/fetchGql'
import getCleanBody from '@utils/getCleanBody'

function getQuery(day) {
  return `
  query checkHoro{
    horoscopeDaily {
      ${day.toLowerCase()} {
        entry {
          id
          thumbnail
          title
          body
          url
        }
      }
    }
  }
  `
}

export default async function checkHoroFromDay(_, { day }) {
  const dayForQuery = day.toLowerCase()
  const query = getQuery(dayForQuery)

  const response = await fetchGql({ query })
  const data = get(response, `data.data.horoscopeDaily.${dayForQuery}.entry`)
  if (!data) return null

  return {
    ...data,
    body: getCleanBody(get(data, 'body[0]')),
  }
}
