export function shuffleArray(words: string[]) {
  for (var i = words.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1))
    var temp = words[i]
    words[i] = words[j]
    words[j] = temp
  }
  return words
}
