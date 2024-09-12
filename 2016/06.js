const fs = require('fs');

p1 = (data) => {
    let dicts = constructDicts(data)

    return dicts.map(x => {
        return Object.keys(x).sort((a, b) => x[b] - x[a])[0]
    }).join('')
};

p2 = (data) => {
    let dicts = constructDicts(data)

    return dicts.map(x => {
        return Object.keys(x).sort((a, b) => x[a] - x[b])[0]
    }).join('')
}

constructDicts = (data) => {
    let dicts = new Array(data[0].length).fill(0).map(x => { return {} })

    data.forEach(x => {
        x.forEach((l, i) => dicts[i][l] = (dicts[i][l] || 0) + 1)
    })

    return dicts
}

parse = (data) => {
    return data
        .split('\r\n')
        .map(x => x.split(''))
}

main = async () => {
    await fs.readFile('./06.txt', 'utf8', async (err, data) => {
        data = parse(data)

        console.log('part 1:', measure(() => p1(structuredClone(data))))
        console.log('part 2:', measure(() => p2(structuredClone(data))))
    });
}

measure = (fn) => {
    const start = performance.now();
    let result = fn();
    const end = performance.now();

    return `${result} (${Math.round((end - start) * 10000) / 10000} ms)`;
}

main();