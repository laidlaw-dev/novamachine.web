import { cutUpService } from "./cutUpService"

vi.mock("../../../utils/shuffle", () => ({
  shuffle: (array: string[]) => array.reverse(),
}))

const randomize = { length: 3, randomize: 0 }

describe("cutUpService", () => {
  test("when text is empty, returns empty array", () => {
    expect(cutUpService("", randomize, randomize)).toBeArrayOfSize(0)
  })
  test("cuts up, shuffles and rejoins text", () => {
    const text =
      "the quick brown fox jumps over the very lazy dog lying on the purple rug"
    const result = cutUpService(text, randomize, randomize)
    expect(result).toBeArrayOfSize(2)
    expect(result[0]).toBe("the purple rug dog lying on the very lazy")
    expect(result[1]).toBe("fox jumps over the quick brown")
  })
  test("when text length non mod, cuts up, shuffles and rejoins text", () => {
    const text =
      "the quick brown fox jumps over the very lazy dog lying on the rug"
    const result = cutUpService(text, randomize, randomize)
    expect(result).toBeArrayOfSize(2)
    expect(result[0]).toBe("the rug dog lying on the very lazy")
    expect(result[1]).toBe("fox jumps over the quick brown")
  })
  test("cleans up text", () => {
    const text =
      '"The quick brown fox jumps over the very, lazy dog lying on the rug."'
    const result = cutUpService(text, randomize, randomize)
    expect(result).toBeArrayOfSize(2)
    expect(result[0]).toBe("the rug dog lying on the very lazy")
    expect(result[1]).toBe("fox jumps over the quick brown")
  })
})
