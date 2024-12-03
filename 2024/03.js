const fs = require('fs');

p1 = (data) => {
    const regex = /(mul\(\d{1,3}\,\d{1,3}\))/g
    const parseRegex = /(\d{1,3})\,(\d{1,3})/

    return data.match(regex)
               .map(x => parseRegex.exec(x))
               .map(x => [parseInt(x[1]), parseInt(x[2])])
               .reduce((p, c) => p + c[0] * c[1], 0)
};

p2 = (data) => {
    const regex = /(mul\(\d{1,3}\,\d{1,3}\)|do\(\)|don\'t\(\))/g
    const parseRegex = /(\d{1,3})\,(\d{1,3})/

    let matches = data.match(regex)
    let instructions = [];

    let shouldAdd = true;
    for (let i = 0; i < matches.length; i++) {
        if (matches[i] === 'do()') {
            shouldAdd = true
            continue
        }
        if (matches[i] === 'don\'t()') {
            shouldAdd = false
            continue
        }

        if (shouldAdd)
            instructions.push(matches[i])
    }

    return instructions
        .map(x => parseRegex.exec(x))
        .map(x => [parseInt(x[1]), parseInt(x[2])])
        .reduce((p, c) => p + c[0] * c[1], 0)
}

parse = (data) => {
    return data
}

main = async () => {
    await fs.readFile('./03.txt', 'utf8', async (err, data) => {
        data = parse(data)

        console.log('part 1:', measure(() => p1(structuredClone(data))));
        console.log('part 2:', measure(() => p2(structuredClone(data))));
    });
}

measure = (fn) => {
    const start = performance.now();
    let result = fn();
    const end = performance.now();

    return `${result} (${Math.round((end - start) * 10000) / 10000} ms)`;
}

main();