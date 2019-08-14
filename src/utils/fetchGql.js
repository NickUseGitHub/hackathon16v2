import axios from 'axios'

export default function({ query, variables, restApiOptions = {} }) {
  const {
    method = 'post',
    url = 'https://uat-graph.sanook.com/',
  } = restApiOptions

  return axios({
    ...restApiOptions,
    method,
    url,
    data: {
      query,
      variables,
    },
  })
}
