import { random, type RandomParams } from "../../../utils/random"
import { shuffle } from "../../../utils/shuffle"
import { cleanText, splitText } from "../../../utils/text"

export const cutUpService = (
  text: string,
  randomizeCut: RandomParams,
  randomizeJoin: RandomParams,
): string[] => {
  if (text.length === 0) return []
  const words = splitText(cleanText(text))
  const slices = createSlices(words, [], randomizeCut)
  const shuffledSlices = shuffle<string>(slices)
  return joinSlices(shuffledSlices, [], randomizeJoin)
}

const createSlices = (
  words: string[],
  slices: string[],
  randomize: RandomParams,
): string[] => {
  const cutLength = random(randomize)
  if (cutLength >= words.length) return [...slices, words.join(" ")]
  const cut = words.slice(0, cutLength)

  return createSlices(
    words.slice(cutLength),
    [...slices, cut.join(" ")],
    randomize,
  )
}

const joinSlices = (
  slices: string[],
  joined: string[],
  randomize: RandomParams,
): string[] => {
  const joinLength = random(randomize)
  if (joinLength >= slices.length) return [...joined, slices.join(" ")]
  const join = slices.slice(0, joinLength)
  return joinSlices(
    slices.slice(joinLength),
    [...joined, join.join(" ")],
    randomize,
  )
}
