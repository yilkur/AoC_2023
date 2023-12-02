const fs = require('fs')

const dataArray = fs
  .readFileSync('input.txt', { encoding: 'utf-8' })
  .split('\n\n')
  .map(x => x.trim().split('\n'))[0]

const sumPowers = gameArray =>
  gameArray.reduce((acc, game) => {
    const redCubes = game.match(/\d+\s(?:red)/g)
    const greenCubes = game.match(/\d+\s(?:green)/g)
    const blueCubes = game.match(/\d+\s(?:blue)/g)
    const maxRedCubes = Math.max(
      ...redCubes.map(num => Number(num.match(/\d+/g)))
    )
    const maxGreenCubes = Math.max(
      ...greenCubes.map(num => Number(num.match(/\d+/g)))
    )
    const maxBlueCubes = Math.max(
      ...blueCubes.map(num => Number(num.match(/\d+/g)))
    )

    const power = maxRedCubes * maxGreenCubes * maxBlueCubes
    return acc + power
  }, 0)

console.log(sumPowers(dataArray))
