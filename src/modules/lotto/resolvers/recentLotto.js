import get from 'lodash/get'
import fetchGql from '@utils/fetchGql'

export default async function recentLotto() {
  const result = await fetchGql({
    query: `
      {
        recentLotto {
          id
          title
          prizeResult {
            prize1 {
              ...lottoResult
            }
            prize2 {
              ...lottoResult
            }
            prize3 {
              ...lottoResult
            }
            prize4 {
              ...lottoResult
            }
            prize5 {
              ...lottoResult
            }
            prize1Close {
              ...lottoResult
            }
            prizeLast2 {
              ...lottoResult
            }
            prizeLast3 {
              ...lottoResult
            }
            prizeFirst3 {
              ...lottoResult
            }
            specialPrizeGroup {
              prizeGroup1 {
                ...lottoResult
              }
              prizeGroup2 {
                ...lottoResult
              }
            }
          }
        }
      }
      
      fragment lottoResult on LottoPrizeGroup {
        amount
        value
        results
      }
      `,
  })

  return get(result, 'data.data.recentLotto')
}
