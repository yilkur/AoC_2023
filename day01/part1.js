const fs = require('fs')

const dataArray = fs
    .readFileSync('input.txt', {encoding: 'utf-8'})
    .split('\n\n')
    .map(x => x
        .replace(/[\n ,]+/g, ' ')
        .trim()
        .split(' ')
    )[0]

const sumDigits = arr => arr.reduce((acc, val) => {
    const digitsOnly = val.replace(/\D/g, '')
    const firstDigit = digitsOnly[0]
    const lastDigit =digitsOnly[digitsOnly.length - 1]
    const num = Number(firstDigit + lastDigit)
    return acc + num
}, 0)


console.log(sumDigits(dataArray))
