import { getAppVersion } from "./appVersion"

vi.mock("../../../../package.json", () => ({
  default: {
    version: "1.2.3",
  },
}))

describe("getAppVersion", () => {
  test("gets app version", () => {
    expect(getAppVersion()).toBe("1.2.3")
  })
})
