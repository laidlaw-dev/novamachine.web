import { cleanText, splitText } from "../../src/utils/text"

describe("cleanText", () => {
  test("when text is null, returns empty string", () => {
    expect(cleanText(null)).toBe("")
  })
  test("when text is undefined, returns empty string", () => {
    expect(cleanText()).toBe("")
  })
  test("handles empty string", () => {
    expect(cleanText("")).toBe("")
  })
  test("trims witespace", () => {
    const text = " abc 123 abc "
    expect(cleanText(text)).toBe("abc 123 abc")
  })
  test("converts to lowerCase", () => {
    const text = "abc123ABC"
    expect(cleanText(text)).toBe("abc123abc")
  })
  test("normalizes whitespace", () => {
    const text = "abc   123\r\rabc\n\n123"
    expect(cleanText(text)).toBe("abc 123 abc 123")
  })
  test("retains accented letters", () => {
    const text = "ÀêÂÙ"
    expect(cleanText(text)).toBe("àêâù")
  })
  test("retains punctuation mid word", () => {
    const text = "'didn't 123,456.789 abc-def'"
    expect(cleanText(text)).toBe("didn't 123,456.789 abc-def")
  })
  test("removes punctuation", () => {
    const text = '"abc, 123. abc"'
    expect(cleanText(text)).toBe("abc 123 abc")
  })
})

describe("splitText", () => {
  test("when text is null, returns empty array", () => {
    expect(splitText(null)).toBeArrayOfSize(0)
  })
  test("when text is undefined, returns empty array", () => {
    expect(splitText()).toBeArrayOfSize(0)
  })
  test("splits text by space", () => {
    const text = "abc 123 ABC"
    expect(splitText(text)).toEqual(["abc", "123", "ABC"])
  })
  test("when no space, returns single element", () => {
    const text = "abc123ABC"
    expect(splitText(text)).toEqual(["abc123ABC"])
  })
})
