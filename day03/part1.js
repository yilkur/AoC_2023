const fs = require('fs')

const data = fs
  .readFileSync('input.txt', 'utf-8')
  .split('\n\n')
  .map(x => x.split('\n'))[0]

const isSymbol = str => !/[\d.]/.test(str)
const isNumber = str => !isNaN(str)
let sum = 0
let hasAdjacentSymbol = false
let tempNum = ''

for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < data[i].length; j++) {
    let currentElement = data[i][j]

    const top = data[i - 1]?.[j]
    const topRight = data[i - 1]?.[j + 1]
    const right = data[i][j + 1]
    const bottom = data[i + 1]?.[j]
    const bottomRight = data[i + 1]?.[j + 1]
    const bottomLeft = data[i + 1]?.[j - 1]
    const left = data[i][j - 1]
    const topLeft = data[i - 1]?.[j - 1]

    if (isNumber(currentElement)) {
      tempNum += currentElement
      if (
        (top && isSymbol(top)) ||
        (topRight && isSymbol(topRight)) ||
        (right && isSymbol(right)) ||
        (bottom && isSymbol(bottom)) ||
        (bottomRight && isSymbol(bottomRight)) ||
        (bottomLeft && isSymbol(bottomLeft)) ||
        (left && isSymbol(left)) ||
        (topLeft && isSymbol(topLeft))
      ) {
        hasAdjacentSymbol = true
      }
    } else {
      if (hasAdjacentSymbol) {
        hasAdjacentSymbol = false
        sum += Number(tempNum)
      }
      tempNum = ''
    }
  }
}

console.log(sum)
