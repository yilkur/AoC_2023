const fs = require('fs')

const data = fs.readFileSync('input.txt', 'utf-8')
const lines = data.trim().split('\n')

const height = lines.length
const width = lines[0].length

const engineSchematic = Array.from({ length: height }, () =>
  Array.from({ length: width }, () => [])
)

const isSymbol = (i, j, num) => {
  if (!(0 <= i && i < height && 0 <= j && j < width)) {
    return false
  }

  if (lines[i][j] === '*') {
    engineSchematic[i][j].push(num)
  }
  return lines[i][j] !== '.' && !isNaN(lines[i][j])
}

let ans = 0

for (let i = 0; i < height; i++) {
  let start = 0
  let j = 0

  while (j < width) {
    start = j
    let num = ''

    while (j < width && !isNaN(lines[i][j])) {
      num += lines[i][j]
      j++
    }

    if (num === '') {
      j++
      continue
    }

    num = parseInt(num)
    isSymbol(i, start - 1, num) || isSymbol(i, j, num)

    for (let k = start - 1; k <= j; k++) {
      isSymbol(i - 1, k, num) || isSymbol(i + 1, k, num)
    }
  }
}

for (let i = 0; i < height; i++) {
  for (let j = 0; j < width; j++) {
    const nums = engineSchematic[i][j]

    if (lines[i][j] === '*' && nums.length === 2) {
      ans += nums[0] * nums[1]
    }
  }
}

console.log(ans)
