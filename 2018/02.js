const fs = require('fs');

p1 = (data) => {
    let twos = 0
    let threes = 0

    data.forEach(x => {
        let counter = new Array(26).fill(0)
        x.split('').forEach(y => counter[y.charCodeAt(0) - 97]++)

        if (counter.filter(x => x === 2).length > 0)
            twos++
        if (counter.filter(x => x === 3).length > 0)
            threes++
    })

    return twos * threes
};

p2 = (data) => {
    let box1, box2

    for (let i = 0; i < data.length - 1; i++) {
        for (let j = i; j < data.length; j++) {
            if (data[i].split('').filter((x, k) => data[j].split('')[k] !== x).length === 1) {
                box1 = data[i]
                box2 = data[j]
            }
        }
    }
    return box1.split('').filter((x, i) => box2.split('')[i] === x).join('')
}

parse = (data) => {
    return data.split('\n');
}

main = async () => {
    await fs.readFile('./02.txt', 'utf8', async (err, data) => {
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