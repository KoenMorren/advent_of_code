const fs = require('fs');

p1 = (data) => {


    return null
};

p2 = (data) => {


    return null
}

parse = (data) => {
    return data;
}

main = async () => {
    await fs.readFile('./{{DAY}}.txt', 'utf8', async (err, data) => {
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