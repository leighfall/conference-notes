export default defineEventHandler(async (event) => {
  const path = getQuery(event).path as string
  return queryCollection(event, 'content').path(path).first()
})
