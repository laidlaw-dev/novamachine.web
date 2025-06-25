export interface RandomParams {
  length: number
  randomize: number
}

export const random = ({ length, randomize }: RandomParams) => {
  if (randomize === 0) return length
  const numberOfSlots = (length - 1) * 2 + 1
  const randomizeFactor = Math.sin((Math.PI / 2) * randomize)
  const random = (Math.random() - 0.5) * randomizeFactor
  return Math.round(random * numberOfSlots) + length
}
