import get from 'lodash/get'
import fetchGql from '@utils/fetchGql'
import getCleanBody from '@utils/getCleanBody'

const queryHighlight = `
query getHomeHilightEntries($channels: [EntryChannel]!,$types: [EntryType], $categoryIds: [EntryCategoryIDsFilter],$orderBy: EntryOrder, $after: String, $first: Int) {
  entries(channels: $channels,types: $types,categoryIds: $categoryIds, orderBy: $orderBy, after: $after, first: $first) {
    edges {
      node {
        ...entryListFields
        categories {
          id
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
 
fragment entryListFields on EntryInterface {
  id
  body
  title
  type
  thumbnail
  channel {
    slug
    label
  }
  channelOriginal {
    label
    slug
  }
  primaryCategory {
    name
    slug
  }
  primaryTag
  viewCount
  redirectTo
  isShowComment
  redirectInternal {
    page
    params
  }
  decors {
    type
    value
  }
  createdAt: createdAtHuman
  createdAtdatetime: createdAtHuman(autoRelative: false, format: "Y-MM-DD HH:mm", locale: "en")
}
`

function mapNodeToEntry(item) {
  const id = get(item, 'node.id')
  const title = get(item, 'node.title')
  const thumbnail = get(item, 'node.thumbnail')
  const body = getCleanBody(get(item, 'node.body[0]'))
  const channelOrign = get(item, 'node.channel')
  const channel = get(channelOrign, 'slug')
  const url = channel && id ? `https://www.sanook.com/${channel}/${id}/` : ''

  return {
    id,
    body,
    title,
    thumbnail,
    url,
  }
}

function validateEntry(entry) {
  return entry.title && entry.thumbnail && entry.url
}

export default {
  Query: {
    async highlightEntries() {
      const response = await fetchGql({
        query: queryHighlight,
        variables: {
          channels: ['news'],
          types: ['content'],
          categoryIds: [
            {
              channel: 'news',
              ids: [1421, 6213, 6218, 6438],
            },
          ],
          orderBy: {
            field: 'CREATED_AT',
            direction: 'DESC',
          },
          after: null,
          first: 15,
        },
      })

      const items = get(response, 'data.data.entries.edges') || []

      return items.map(mapNodeToEntry).filter(validateEntry)
    },
  },
}
