export default defineEventHandler(async (event) => {
  return queryCollectionNavigation(event, 'content', ['stem'])
})
