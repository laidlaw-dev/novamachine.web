import { expect, afterEach } from "vitest"
import { cleanup } from "@testing-library/react"
import * as matchers from "@testing-library/jest-dom/matchers"
import * as matchersEx from "jest-extended"

expect.extend(matchers)
expect.extend(matchersEx)

afterEach(() => {
	cleanup()
})
