const fs = require('fs');

p1 = (data) => {
    return data.reduce((p, c) => p + c, 0)
};

p2 = (data) => {
    let res = {}
    let i = 0
    let curr = 0

    while (true) {
        curr += data[i]

        // Dictionary look-ups are a lot faster than array.indexOf
        if (res[curr])
            return curr

        res[curr] = true
        i = (i + 1) % data.length
    }
}

parse = (data) => {
    return data.split('\n')
               .map(x => parseInt(x));
}

main = async () => {
    await fs.readFile('./01.txt', 'utf8', async (err, data) => {
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