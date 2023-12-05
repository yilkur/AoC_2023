const fs = require('fs')

const readInput = filename =>
  fs.readFileSync(filename, 'utf-8').trim().split('\n')
const lines = readInput('input.txt')
const height = lines.length
const width = lines[0].length

const initializeEngineSchematic = (height, width) =>
  Array.from({ length: height }, () => Array.from({ length: width }, () => []))

const isSymbol = (lines, engineSchematic, i, j, num) => {
  const item = lines[i]?.[j]
  const validIndices =
    0 <= i && i < lines.length && 0 <= j && j < lines[0].length

  if (!validIndices) {
    return false
  }

  if (item === '*') {
    engineSchematic[i][j].push(num)
  }

  return item !== '.' && !isNaN(item)
}

const processLine = (lines, engineSchematic, i) => {
  let j = 0

  while (j < lines[i].length) {
    const start = j
    let num = ''

    while (j < lines[i].length && !isNaN(lines[i][j])) {
      num += lines[i][j]
      j++
    }

    if (num !== '') {
      num = parseInt(num)
      isSymbol(lines, engineSchematic, i, start - 1, num) ||
        isSymbol(lines, engineSchematic, i, j, num)

      for (let k = start - 1; k <= j; k++) {
        isSymbol(lines, engineSchematic, i - 1, k, num) ||
          isSymbol(lines, engineSchematic, i + 1, k, num)
      }
    } else {
      j++
    }
  }
}

const calculateAnswer = (lines, engineSchematic) => {
  let sum = 0

  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[0].length; j++) {
      const nums = engineSchematic[i][j]

      if (lines[i][j] === '*' && nums.length === 2) {
        sum += nums[0] * nums[1]
      }
    }
  }

  return sum
}

const engineSchematic = initializeEngineSchematic(height, width)

for (let i = 0; i < height; i++) {
  processLine(lines, engineSchematic, i)
}

const answer = calculateAnswer(lines, engineSchematic)
console.log(answer)
