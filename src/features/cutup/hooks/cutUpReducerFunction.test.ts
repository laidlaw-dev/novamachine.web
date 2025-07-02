import { cutUpReducerFunction, initialState } from "./cutUpReducerFunction"

describe("cutUpReducer", () => {
  describe("Add", () => {
    test("adds new entries", () => {
      const result = cutUpReducerFunction(initialState, {
        type: "add",
        payload: {
          results: ["abc", "def", "ghi"],
        },
      })
      expect(result).toEqual({
        currentMaxIndex: 3,
        results: [
          {
            index: 0,
            text: "abc",
          },
          {
            index: 1,
            text: "def",
          },
          {
            index: 2,
            text: "ghi",
          },
        ],
      })
    })
    test("adds new entries to existing entries", () => {
      const initialResult = cutUpReducerFunction(initialState, {
        type: "add",
        payload: {
          results: ["abc", "def", "ghi"],
        },
      })
      const result = cutUpReducerFunction(initialResult, {
        type: "add",
        payload: {
          results: ["jkl", "mno", "pqr"],
        },
      })
      expect(result).toEqual({
        currentMaxIndex: 6,
        results: [
          {
            index: 0,
            text: "abc",
          },
          {
            index: 1,
            text: "def",
          },
          {
            index: 2,
            text: "ghi",
          },
          {
            index: 3,
            text: "jkl",
          },
          {
            index: 4,
            text: "mno",
          },
          {
            index: 5,
            text: "pqr",
          },
        ],
      })
    })
  })
  describe("delete_single", () => {
    test("deletes single entry", () => {
      const initialResult = cutUpReducerFunction(initialState, {
        type: "add",
        payload: {
          results: ["abc", "def", "ghi"],
        },
      })
      const result = cutUpReducerFunction(initialResult, {
        type: "delete_single",
        payload: {
          index: 1,
        },
      })
      expect(result).toEqual({
        currentMaxIndex: 3,
        results: [
          {
            index: 0,
            text: "abc",
          },
          {
            index: 2,
            text: "ghi",
          },
        ],
      })
    })
    test("when entry not found, does nothing", () => {
      const initialResult = cutUpReducerFunction(initialState, {
        type: "add",
        payload: {
          results: ["abc", "def", "ghi"],
        },
      })
      const result = cutUpReducerFunction(initialResult, {
        type: "delete_single",
        payload: {
          index: 7,
        },
      })
      expect(result).toEqual({
        currentMaxIndex: 3,
        results: [
          {
            index: 0,
            text: "abc",
          },
          {
            index: 1,
            text: "def",
          },
          {
            index: 2,
            text: "ghi",
          },
        ],
      })
    })
  })
  describe("delete_all", () => {
    test("deletes all entries", () => {
      const initialResult = cutUpReducerFunction(initialState, {
        type: "add",
        payload: {
          results: ["abc", "def", "ghi"],
        },
      })
      const result = cutUpReducerFunction(initialResult, {
        type: "delete_all",
      })
      expect(result).toEqual({
        currentMaxIndex: 3,
        results: [],
      })
    })
  })
  describe("reorder", () => {
    test("reorders items", () => {
      const initialResult = cutUpReducerFunction(initialState, {
        type: "add",
        payload: {
          results: ["abc", "def", "ghi"],
        },
      })
      const result = cutUpReducerFunction(initialResult, {
        type: "reorder",
        payload: {
          indicies: [2, 0, 1],
        },
      })
      expect(result).toEqual({
        currentMaxIndex: 3,
        results: [
          {
            index: 2,
            text: "ghi",
          },
          {
            index: 0,
            text: "abc",
          },
          {
            index: 1,
            text: "def",
          },
        ],
      })
    })
    test("when item with index not found, ignores item", () => {
      const initialResult = cutUpReducerFunction(initialState, {
        type: "add",
        payload: {
          results: ["abc", "def", "ghi"],
        },
      })
      const result = cutUpReducerFunction(initialResult, {
        type: "reorder",
        payload: {
          indicies: [2, 0, 4, 1],
        },
      })
      expect(result).toEqual({
        currentMaxIndex: 3,
        results: [
          {
            index: 2,
            text: "ghi",
          },
          {
            index: 0,
            text: "abc",
          },
          {
            index: 1,
            text: "def",
          },
        ],
      })
    })
    test("when index not found, removes item", () => {
      const initialResult = cutUpReducerFunction(initialState, {
        type: "add",
        payload: {
          results: ["abc", "def", "ghi"],
        },
      })
      const result = cutUpReducerFunction(initialResult, {
        type: "reorder",
        payload: {
          indicies: [2, 1],
        },
      })
      expect(result).toEqual({
        currentMaxIndex: 3,
        results: [
          {
            index: 2,
            text: "ghi",
          },
          {
            index: 1,
            text: "def",
          },
        ],
      })
    })
  })
})
