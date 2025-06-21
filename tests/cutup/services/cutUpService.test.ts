import { cutUpService } from "../../../src/features/cutup/services/cutUpService"

vi.mock("../../../src/utils/shuffle", () => ({
  shuffle: (array: string[]) => array.reverse(),
}))

describe("cutUpService", () => {
  test("when text is empty, returns empty array", () => {
    expect(cutUpService("")).toBeArrayOfSize(0)
  })
  test("cuts up, shuffles and rejoins text", () => {
    const text =
      "the quick brown fox jumps over the very lazy dog lying on the rug"
    const result = cutUpService(text)
    expect(result).toBeArrayOfSize(2)
    expect(result[0]).toBe("the rug dog lying on the very lazy")
    expect(result[1]).toBe("fox jumps over the quick brown")
  })
  test("cleans up text", () => {
    const text =
      '"The quick brown fox jumps over the very, lazy dog lying on the rug."'
    const result = cutUpService(text)
    expect(result).toBeArrayOfSize(2)
    expect(result[0]).toBe("the rug dog lying on the very lazy")
    expect(result[1]).toBe("fox jumps over the quick brown")
  })
})
