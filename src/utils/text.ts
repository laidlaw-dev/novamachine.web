const punctuationMatch =
  /[^\w\u00C0-\u017F\s',.-]|(?<![\w\u00C0-\u017F])[',.-]|[',.-](?![\w\u00C0-\u017F])/gm

export const cleanText = (text?: string | null): string => {
  if (text == null) return ""
  const trimmed = text.trim()
  const lowerCase = trimmed.toLocaleLowerCase()
  const removedPunctuation = lowerCase.replace(punctuationMatch, "")
  return removedPunctuation.replace(/\s+/gm, " ")
}

export const splitText = (text?: string | null): string[] => {
  if (text == null) return []
  return text.split(" ")
}
