const fs = require('fs');

p1 = (data) => {
    let steps = 0
    let i = 0

    while (i >= 0 && i < data.length) {
        i += data[i]++
        steps++
    }

    return steps
};

p2 = (data) => {
    let steps = 0
    let i = 0
    
    while (i >= 0 && i < data.length) {
        var offset = data[i]
        data[i] += data[i] >= 3 ? -1 : 1
        i += offset
        steps++
    }

    return steps
}

parse = (data) => {
    return data.split(/[\r\n]+/)
               .map(x => +x)
}

main = async () => {
    await fs.readFile('./05.txt', 'utf8', async (err, data) => {
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