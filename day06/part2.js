const fs = require('fs')

const data = fs
  .readFileSync('input.txt', 'utf-8')
  .split('\n\n')
  .map(x => x.split('\n'))[0]

const time = Number(data[0].match(/\d+/g).join(''))
const distance = Number(data[1].match(/\d+/g).join(''))

let waysToWin = 0

for (let buttonDownTime = 1; buttonDownTime < time; buttonDownTime++) {
  const distanceTravelled = (time - buttonDownTime) * buttonDownTime

  if (distanceTravelled > distance) {
    waysToWin++
  }
}

console.log(waysToWin)
