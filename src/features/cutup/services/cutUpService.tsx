import { shuffle } from "../../../utils/shuffle"
import { cleanText, splitText } from "../../../utils/text"

export const cutUpService = (text: string): string[] => {
  if (text.length === 0) return []
  const words = splitText(cleanText(text))
  const slices = createSlices(words, [])
  const shuffledSlices = shuffle<string>(slices)
  return joinSlices(shuffledSlices, [])
}

const createSlices = (words: string[], slices: string[]): string[] => {
  const cutLength = 3
  if (cutLength >= words.length) return [...slices, words.join(" ")]
  const cut = words.slice(0, cutLength)
  return createSlices(words.slice(cutLength), [...slices, cut.join(" ")])
}

const joinSlices = (slices: string[], joined: string[]): string[] => {
  const joinLength = 3
  if (joinLength > slices.length) return [...joined, slices.join(" ")]
  const join = slices.slice(0, joinLength)
  return joinSlices(slices.slice(joinLength), [...joined, join.join(" ")])
}
