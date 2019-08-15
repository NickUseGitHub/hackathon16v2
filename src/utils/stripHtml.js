export default function stripHtml(str) {
  if (!str || typeof str !== 'string') return

  const htmlTagRegEx = /<[^>]+>/g
  return str.replace(htmlTagRegEx, '')
}
