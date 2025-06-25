import { random } from "../../src/utils/random"

let x: () => number = () => 0
describe("random", () => {
  beforeAll(() => {
    x = Math.random
  })
  afterAll(() => {
    Math.random = x
  })
  test("when randomize = 0, returns length", () => {
    Math.random = () => 0.0
    expect(random({ length: 2, randomize: 0 })).toBe(2)
    expect(random({ length: 3, randomize: 0 })).toBe(3)
    expect(random({ length: 4, randomize: 0 })).toBe(4)
    expect(random({ length: 5, randomize: 0 })).toBe(5)
  })
  test("when randomize = 0.25 and Math.random = 0, returns less than length", () => {
    Math.random = () => 0.0

    expect(random({ length: 2, randomize: 0.25 })).toBe(1)
    expect(random({ length: 3, randomize: 0.25 })).toBe(2)
    expect(random({ length: 4, randomize: 0.25 })).toBe(3)
    expect(random({ length: 5, randomize: 0.25 })).toBe(3)
  })
  test("when randomize = 0.25 and Math.random = 0.5, returns length", () => {
    Math.random = () => 0.5

    expect(random({ length: 2, randomize: 0.25 })).toBe(2)
    expect(random({ length: 3, randomize: 0.25 })).toBe(3)
    expect(random({ length: 4, randomize: 0.25 })).toBe(4)
    expect(random({ length: 5, randomize: 0.25 })).toBe(5)
  })
  test("when randomize = 0.25 and Math.random = 0.99, returns grater than length", () => {
    Math.random = () => 0.99

    expect(random({ length: 2, randomize: 0.25 })).toBe(3)
    expect(random({ length: 3, randomize: 0.25 })).toBe(4)
    expect(random({ length: 4, randomize: 0.25 })).toBe(5)
    expect(random({ length: 5, randomize: 0.25 })).toBe(7)
  })
  test("when randomize = 0.5 and Math.random = 0, returns less than length", () => {
    Math.random = () => 0.0

    expect(random({ length: 2, randomize: 0.5 })).toBe(1)
    expect(random({ length: 3, randomize: 0.5 })).toBe(1)
    expect(random({ length: 4, randomize: 0.5 })).toBe(2)
    expect(random({ length: 5, randomize: 0.5 })).toBe(2)
  })
  test("when randomize = 0.5 and Math.random = 0.5, returns length", () => {
    Math.random = () => 0.5

    expect(random({ length: 2, randomize: 0.5 })).toBe(2)
    expect(random({ length: 3, randomize: 0.5 })).toBe(3)
    expect(random({ length: 4, randomize: 0.5 })).toBe(4)
    expect(random({ length: 5, randomize: 0.5 })).toBe(5)
  })
  test("when randomize = 0.5 and Math.random = 0.99, returns grater than length", () => {
    Math.random = () => 0.99

    expect(random({ length: 2, randomize: 0.5 })).toBe(3)
    expect(random({ length: 3, randomize: 0.5 })).toBe(5)
    expect(random({ length: 4, randomize: 0.5 })).toBe(6)
    expect(random({ length: 5, randomize: 0.5 })).toBe(8)
  })
  test("when randomize = 0.75 and Math.random = 0, returns less than length", () => {
    Math.random = () => 0.0

    expect(random({ length: 2, randomize: 0.75 })).toBe(1)
    expect(random({ length: 3, randomize: 0.75 })).toBe(1)
    expect(random({ length: 4, randomize: 0.75 })).toBe(1)
    expect(random({ length: 5, randomize: 0.75 })).toBe(1)
  })
  test("when randomize = 0.75 and Math.random = 0.5, returns length", () => {
    Math.random = () => 0.5

    expect(random({ length: 2, randomize: 0.75 })).toBe(2)
    expect(random({ length: 3, randomize: 0.75 })).toBe(3)
    expect(random({ length: 4, randomize: 0.75 })).toBe(4)
    expect(random({ length: 5, randomize: 0.75 })).toBe(5)
  })
  test("when randomize = 0.75 and Math.random = 0.99, returns grater than length", () => {
    Math.random = () => 0.99

    expect(random({ length: 2, randomize: 0.75 })).toBe(3)
    expect(random({ length: 3, randomize: 0.75 })).toBe(5)
    expect(random({ length: 4, randomize: 0.75 })).toBe(7)
    expect(random({ length: 5, randomize: 0.75 })).toBe(9)
  })
  test("when randomize = 1.0 and Math.random = 0, returns less than length", () => {
    Math.random = () => 0.0

    expect(random({ length: 2, randomize: 1 })).toBe(1)
    expect(random({ length: 3, randomize: 1 })).toBe(1)
    expect(random({ length: 4, randomize: 1 })).toBe(1)
    expect(random({ length: 5, randomize: 1 })).toBe(1)
  })
  test("when randomize = 1.0 and Math.random = 0.5, returns length", () => {
    Math.random = () => 0.5

    expect(random({ length: 2, randomize: 1 })).toBe(2)
    expect(random({ length: 3, randomize: 1 })).toBe(3)
    expect(random({ length: 4, randomize: 1 })).toBe(4)
    expect(random({ length: 5, randomize: 1 })).toBe(5)
  })
  test("when randomize = 1.0 and Math.random = 0.99, returns grater than length", () => {
    Math.random = () => 0.99

    expect(random({ length: 2, randomize: 1 })).toBe(3)
    expect(random({ length: 3, randomize: 1 })).toBe(5)
    expect(random({ length: 4, randomize: 1 })).toBe(7)
    expect(random({ length: 5, randomize: 1 })).toBe(9)
  })
})
