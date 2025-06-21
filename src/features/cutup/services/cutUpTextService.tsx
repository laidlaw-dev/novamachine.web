import { cleanText, splitText } from "../../../utils/text"

export const cutUpService = (text: string): string[] => {
  const words = splitText(cleanText(text))
  const slices = createSlices(words, [])
  const shuffledSlices = shuffleSlices(slices)
  return joinSlices(shuffledSlices, [])
}

export const createSlices = (words: string[], slices: string[]): string[] => {
  const cutLength = 3
  if (cutLength >= words.length) return [...slices, words.join(" ")]
  const cut = words.slice(0, cutLength)
  return createSlices(words.slice(cutLength), [...slices, cut.join(" ")])
}

export const shuffleSlices = (slices: string[]): string[] => {
  const array = slices.slice()
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export const joinSlices = (slices: string[], joined: string[]): string[] => {
  const joinLength = 3
  if (joinLength > slices.length) return [...joined, slices.join(" ")]
  const join = slices.slice(0, joinLength)
  return joinSlices(slices.slice(joinLength), [...joined, join.join(" ")])
}
