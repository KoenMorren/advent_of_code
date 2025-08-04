const fs = require('fs');

p1 = (data) => {
    return data.reduce((p, c, i) => {
        if (c == data[(i + 1) % data.length])
            p += +c

        return p
    }, 0)
};

p2 = (data) => {
    var offset = data.length / 2

    return data.reduce((p, c, i) => {
        if (c == data[(i + offset) % data.length])
            p += +c

        return p
    }, 0)
}

parse = (data) => {
    return data.split('\r\n');
}

main = async () => {
    await fs.readFile('./01.txt', 'utf8', async (err, data) => {
        data = parse(data)[0].split('')

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