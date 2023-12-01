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
    const numberMap = {
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5,
        six: 6,
        seven: 7,
        eight: 8,
        nine: 9
    }

    let seenNumbers = ''

    for (let i = 0; i < val.length; i++) {
        if (Number(val[i])) {
            seenNumbers += val[i]
            continue
        }

        for (const number in numberMap) {
            if (val[i] === number[0]) {
                const charLength = number.length
                const tempNumber = val.slice(i, i + charLength)

                if (tempNumber === number) {
                    seenNumbers += numberMap[number]
                }
            }
        }
    }

    const firstDigit = seenNumbers[0]
    const lastDigit = seenNumbers[seenNumbers.length - 1]
    const num = Number(firstDigit + lastDigit)
    return acc + num
}, 0)


console.log(sumDigits(dataArray))
