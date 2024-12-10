const fs = require('fs');

p1 = (data) => {
    return new Set(findTrails(data)).size
};

p2 = (data) => {
    return findTrails(data).length
}

findTrails = (data) => {
    let trails = [];

    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            if (data[i][j] !== 0)
                continue

            // it is 0
            // look in all directions for any paths that go up to 9
            trails.push(
                ...findPaths(data, i, j)
                       .map(x => `${i}:${j}-${x}`)
            )
        }
    }

    return trails
}

findPaths = (data, i, j) => {
    if (data[i][j] === 9)
        return [`${i}:${j}`]
    
    let result = []

    if (i > 0 && data[i - 1][j] === data[i][j] + 1)
        result.push(...findPaths(data, i - 1, j))
    if (i < data.length - 1 && data[i + 1][j] === data[i][j] + 1)
        result.push(...findPaths(data, i + 1, j))
    if (j > 0 && data[i][j - 1] === data[i][j] + 1)
        result.push(...findPaths(data, i, j - 1))
    if (j < data[i].length - 1 && data[i][j + 1] === data[i][j] + 1)
        result.push(...findPaths(data, i, j + 1))

    return result
}

parse = (data) => {
    return data.split('\n')
               .map(x => x.split('').map(y => +y));
}

main = async () => {
    await fs.readFile('./10.txt', 'utf8', async (err, data) => {
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