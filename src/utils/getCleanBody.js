import stripHtml from './stripHtml'

export default function getCleanBody(body) {
  if (!body) return body
  return stripHtml(body)
    .split('\n')
    .join('')
}
