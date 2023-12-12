const fs = require('fs')

const data = fs.readFileSync('input.txt', 'utf-8')

const directions = data.split('\n\n')[0]
const map = data
  .split('\n\n')[1]
  .split('\n\n')
  .map(x => x.split('\n'))[0]

const mapObject = map.reduce((object, mapEntry) => {
  const key = mapEntry.split(' = ')[0]
  const value = mapEntry.replace(/[()]/g, '').split(' = ')[1].split(', ')

  object[key] = value

  return object
}, {})

let hasFoundEnd = false
let stepCount = 0
let currentPosition = 'AAA'

const searchForEnd = () => {
  for (const direction of directions) {
    const mapReading = mapObject[currentPosition]
    let nextPosition = ''

    if (direction === 'L') {
      nextPosition = mapReading[0]
    } else {
      nextPosition = mapReading[1]
    }

    stepCount++
    currentPosition = nextPosition

    if (nextPosition === 'ZZZ') {
      hasFoundEnd = true
      return stepCount
    }
  }
}

while (!hasFoundEnd) {
  searchForEnd()
}

console.log(stepCount)
