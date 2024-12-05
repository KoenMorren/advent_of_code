const fs = require('fs');

p1 = (data) => {
    return findTime(data)
};

p2 = (data) => {
    // Add the new disc
    data.push([7, 11, 0, 0])

    return findTime(data)
}

findTime = (data) => {
    let time = 1;

    while (!data.map(x => (x[3] + time + x[0]) % x[1] === 0)
                .reduce((p, c) => p && c, true)) {
        time += data[0][1]
    }

    return time
}

parse = (data) => {
    const regex = /.*(\d+).*(\s\d+).*(\d+).*(\s\d+)\./;

    return data
        .split('\r\n')
        .map(x => regex.exec(x))
        .map(x => [parseInt(x[1]), parseInt(x[2]), parseInt(x[3]), parseInt(x[4])])
}

main = async () => {
    // https://en.wikipedia.org/wiki/Chinese_remainder_theorem

    await fs.readFile('./15.txt', 'utf8', async (err, data) => {
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