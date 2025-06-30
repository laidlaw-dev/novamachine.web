import {
  VISITED_PAGE_STORAGE_KEY,
  hasVisitedPage,
  setVisitedPage,
} from "../../../../src/features/onboarding/utils/storage"

describe("hasVisitedPage", () => {
  beforeEach(() => localStorage.removeItem(VISITED_PAGE_STORAGE_KEY))
  afterAll(() => localStorage.removeItem(VISITED_PAGE_STORAGE_KEY))
  test("when no localStorage entry, returns false", () => {
    expect(hasVisitedPage("test_page")).toBeFalse()
  })
  test("when localStorage entry not an array, returns false", () => {
    localStorage.setItem(VISITED_PAGE_STORAGE_KEY, "test_data")
    expect(hasVisitedPage("test_page")).toBeFalse()
  })
  test("when page not in localStorage entry, returns false", () => {
    localStorage.setItem(
      VISITED_PAGE_STORAGE_KEY,
      JSON.stringify(["test_page_1", "test_page_2"]),
    )
    expect(hasVisitedPage("test_page")).toBeFalse()
  })
  test("when page is in localStorage entry, returns true", () => {
    localStorage.setItem(
      VISITED_PAGE_STORAGE_KEY,
      JSON.stringify(["test_page_1", "test_page", "test_page_2"]),
    )
    expect(hasVisitedPage("test_page")).toBeTrue()
  })
})

describe("setVisitedPage", () => {
  beforeEach(() => localStorage.removeItem(VISITED_PAGE_STORAGE_KEY))
  afterAll(() => localStorage.removeItem(VISITED_PAGE_STORAGE_KEY))
  test("when no localStorage entry, writes page", () => {
    setVisitedPage("test_page")
    expect(JSON.parse(localStorage.getItem(VISITED_PAGE_STORAGE_KEY)!)).toEqual(
      ["test_page"],
    )
  })
  test("when localStorage entry not an array, writes page", () => {
    localStorage.setItem(VISITED_PAGE_STORAGE_KEY, "test_data")
    setVisitedPage("test_page")
    expect(JSON.parse(localStorage.getItem(VISITED_PAGE_STORAGE_KEY)!)).toEqual(
      ["test_page"],
    )
  })
  test("when page already in localStorage entry not an array, does nothing", () => {
    localStorage.setItem(
      VISITED_PAGE_STORAGE_KEY,
      JSON.stringify(["test_page_1", "test_page", "test_page_2"]),
    )
    setVisitedPage("test_page")
    expect(JSON.parse(localStorage.getItem(VISITED_PAGE_STORAGE_KEY)!)).toEqual(
      ["test_page_1", "test_page", "test_page_2"],
    )
  })
  test("when page not already in localStorage entry not an array, appends page", () => {
    localStorage.setItem(
      VISITED_PAGE_STORAGE_KEY,
      JSON.stringify(["test_page_1", "test_page_2"]),
    )
    setVisitedPage("test_page")
    expect(JSON.parse(localStorage.getItem(VISITED_PAGE_STORAGE_KEY)!)).toEqual(
      ["test_page_1", "test_page_2", "test_page"],
    )
  })
})
