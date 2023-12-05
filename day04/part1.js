const fs = require('fs')

const data = fs
  .readFileSync('input.txt', 'utf-8')
  .split('\n\n')
  .map(x => x.split('\n'))[0]

const getCards = cardsArr =>
  cardsArr.map(card => {
    let [winningNumbers, yourNumbers] = card.split(' | ')
    winningNumbers = winningNumbers.split(':')[1].trim()
    return [winningNumbers, yourNumbers]
  })

const cards = getCards(data)

let totalScore = 0

for (const card of cards) {
  const winningNumbers = card[0].split(/\s+/)
  const yourNumbers = card[1].split(/\s+/)
  let hasWinningNumbers = false

  const cardScore = winningNumbers.reduce((acc, winningNumber) => {
    const isInitialMatch =
      yourNumbers.includes(winningNumber) && !hasWinningNumbers
    const isAdditionalMatch = yourNumbers.includes(winningNumber)

    if (isInitialMatch) {
      hasWinningNumbers = true
      acc = 1
    } else if (isAdditionalMatch) {
      acc *= 2
    }
    return acc
  }, 0)

  totalScore += cardScore
}

console.log(totalScore)
