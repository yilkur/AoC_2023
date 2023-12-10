const fs = require('fs')

const data = fs
  .readFileSync('input.txt', 'utf-8')
  .split('\n\n')
  .map(x => x.split('\n'))[0]

const times = data[0].match(/\d+/g).map(Number)
const distances = data[1].match(/\d+/g).map(Number)

const races = {}
let allWaysToWin = 1

times.forEach((time, idx) => {
  const race = 'race ' + (idx + 1)
  races[race] = { time: time, distance: distances[idx] }
})

for (const race in races) {
  let waysToWin = 0
  const { time, distance } = races[race]
  console.log(time, distance)

  for (let buttonDownTime = 1; buttonDownTime < time; buttonDownTime++) {
    const distanceTravelled = (time - buttonDownTime) * buttonDownTime

    if (distanceTravelled > distance) {
      waysToWin++
    }
  }

  allWaysToWin *= waysToWin
}

console.log(allWaysToWin)
