import axios from 'axios'
import get from 'lodash/get'

export default {
  Query: {
    async recentLotto() {
      const result = await axios({
        method: 'post',
        url: 'http://localhost/',
        data: {
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
        },
      })

      return get(result, 'data.data.recentLotto')
    },
  },
}
