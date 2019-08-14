import get from 'lodash/get'
import fetchGql from '@utils/fetchGql'

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

export default {
  Query: {
    async checkHoroFromDay(_, { day }) {
      const dayForQuery = day.toLowerCase()
      const query = getQuery(dayForQuery)

      const response = await fetchGql({ query })
      const data = get(
        response,
        `data.data.horoscopeDaily.${dayForQuery}.entry`,
      )
      if (!data) return null

      return {
        ...data,
        body: get(data, 'body[0]'),
      }
    },
  },
}
