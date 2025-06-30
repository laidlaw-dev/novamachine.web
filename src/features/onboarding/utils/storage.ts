export const VISITED_PAGE_STORAGE_KEY = "pages_visted"

export const hasVisitedPage = (pageKey: string): boolean => {
  const visitedPagesJson = localStorage.getItem(VISITED_PAGE_STORAGE_KEY)

  if (!visitedPagesJson) return false
  try {
    const visitedPages = JSON.parse(visitedPagesJson)
    return Array.isArray(visitedPages) && visitedPages.includes(pageKey)
  } catch {
    return false
  }
}

export const setVisitedPage = (pageKey: string) => {
  const visitedPagesJson = localStorage.getItem(VISITED_PAGE_STORAGE_KEY)
  try {
    if (visitedPagesJson) {
      const visitedPages = JSON.parse(visitedPagesJson)
      if (Array.isArray(visitedPages)) {
        if (!visitedPages.includes(pageKey)) {
          localStorage.setItem(
            VISITED_PAGE_STORAGE_KEY,
            JSON.stringify([...visitedPages, pageKey]),
          )
        }
        return
      }
    }
    /* eslint-disable no-empty*/
  } catch {}
  localStorage.setItem(VISITED_PAGE_STORAGE_KEY, JSON.stringify([pageKey]))
}
