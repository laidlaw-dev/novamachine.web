import { shuffle } from "../../src/utils/shuffle"

describe("shuffle", () => {
  test("when array is empty, returns empty array", () => {
    expect(shuffle<number>([])).toBeArrayOfSize(0)
  })
  test("when array has one entry, returns array with one entry", () => {
    expect(shuffle<number>([3])).toEqual([3])
  })
  test("returns array of same size and contents", () => {
    const source = [1, 2, 3, 4, 5]
    const result = shuffle<number>(source)
    expect(result).toBeArrayOfSize(5)
    expect(result.includes(1)).toBeTrue()
    expect(result.includes(2)).toBeTrue()
    expect(result.includes(3)).toBeTrue()
    expect(result.includes(4)).toBeTrue()
    expect(result.includes(5)).toBeTrue()
  })
})
