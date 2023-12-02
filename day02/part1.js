const fs = require('fs')

const dataArray = fs
  .readFileSync('input.txt', { encoding: 'utf-8' })
  .split('\n\n')
  .map(x => x.trim().split('\n'))[0]

const REDMAX = 12
const GREENMAX = 13
const BLUEMAX = 14

const filterPossbileGames = gameArray =>
  gameArray.filter(game => {
    const sets = game.split(';')
    console.log(sets)


    let i = 0
    while (i < sets.length) {
      const redCubes = sets[i].match(/\d+\s(?:red)/g)
      const greenCubes = sets[i].match(/\d+\s(?:green)/g)
      const blueCubes = sets[i].match(/\d+\s(?:blue)/g)

      const sumCubes = cubeArr =>
        cubeArr?.reduce((acc, val) => acc + Number(val.match(/\d+/g)), 0)

      const redSum = sumCubes(redCubes)
      const greenSum = sumCubes(greenCubes)
      const blueSum = sumCubes(blueCubes)

      if (redSum > REDMAX || greenSum > GREENMAX || blueSum > BLUEMAX) {
        return false
      }

      i++
    }

    return true
  })

const possibleGames = filterPossbileGames(dataArray)

let sum = 0

for (const game of possibleGames) {
  const gameStr = game.match(/Game\s\d+/g)
  sum += Number(gameStr[0].match(/\d+/g))
}

console.log(sum)
