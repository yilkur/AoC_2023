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

const cardCounts = []

let totalDecks = 0
let cardIdx = 0

for (const card of cards) {
  const winningNumbers = card[0].split(/\s+/)
  const yourNumbers = card[1].split(/\s+/)

  let numOfMatches = yourNumbers.filter(num =>
    winningNumbers.includes(num)
  ).length

  cardCounts.push({ matches: numOfMatches, copies: 1 })
}

for (const cardIdx in cardCounts) {
  const repetitions = cardCounts[+cardIdx].copies
  const numOfMatches = cardCounts[+cardIdx].matches

  let startIdx = +cardIdx + 1
  let endIdx = startIdx + numOfMatches

  for (let i = 0; i < repetitions; i++) {
    for (let j = startIdx; j < endIdx; j++) {
      cardCounts[j].copies++
    }
  }
  totalDecks += repetitions
}

console.log(totalDecks)