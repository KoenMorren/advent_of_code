const fs = require('fs');

p1 = (data) => {
    // Naive approach
    for (let i = 0; i < 25; i ++) {
        let tmp = []

        for (let j = 0; j < data.length; j++) {
            tmp.push(...blink(data[j]))
        }

        data = tmp
    }

    return data.length
};

p2 = (data) => {
    // Data optimised approach
    let dict = data.sort((a, b) => a - b).reduce((p, c) => { p[c] = (p[c] || 0) + 1; return p }, {})

    for (let i = 1; i <= 75; i ++) {
        let keys = Object.keys(dict)
        let newDict = {}
        for (let i = 0; i < keys.length; i++) {
            let k = keys[i]
            let tmp = blink(k)

            tmp.forEach(x => newDict[x] = (newDict[x] || 0) + dict[k])
        }

        dict = newDict
    }

    return Object.values(dict).reduce((p, c) => p + c, 0)
}
blink = (stone) => {
    let tmp = []

    if (stone == 0) {
        tmp.push(1)
    } else if (stone.toString().length % 2 === 0) {
        let s = stone.toString()
        tmp.push(+s.substring(0, (s.length / 2)))
        tmp.push(+s.substring(s.length / 2))
    } else {
        tmp.push(stone * 2024)
    }

    return tmp
}

parse = (data) => {
    return data.split(' ').map(y => +y)
}

main = async () => {
    await fs.readFile('./11.txt', 'utf8', async (err, data) => {
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