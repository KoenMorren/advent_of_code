const fs = require('fs');

p1 = (target, data) => {
    const indexes = new Array(data.length).fill(0).map((_, i) => i)

    const viableCombinations = 
        defineGroupings(indexes)
            .map(x => x.map(y => data[y]))
            .filter(x => x.reduce((p, c) => p + c, 0) === target)

    return viableCombinations.length
}

p2 = (target, data) => {
    const indexes = new Array(data.length).fill(0).map((_, i) => i)

    const viableCombinations = 
        defineGroupings(indexes)
            .map(x => x.map(y => data[y]))
            .filter(x => x.reduce((p, c) => p + c, 0) === target)

    const sorted = viableCombinations.sort((a, b) => a.length - b.length)
    const minLength = sorted[0].length

    return viableCombinations.filter(x => x.length === minLength).length
}

// what is this magic
defineGroupings = (arr) => {
    if (arr.length === 0)
        return [[]]

    const first_item = arr[0]
    const remainder = arr.slice(1)

    groupings = defineGroupings(remainder);

    let combined = [];
    groupings.forEach(x => combined.push([first_item, ...x]))

    return [...combined, ...groupings]
}

parse = (input) => {
    return input.split('\r\n')
                .map(x => parseInt(x));
}

main = async () => {
    const liters = 150;
    
    await fs.readFile('./17.txt', 'utf8', async (err, data) => {
        data = parse(data)

        console.log('part 1:', p1(liters, structuredClone(data)));
        console.log('part 2:', p2(liters, structuredClone(data)));
    });
}

main();