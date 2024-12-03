const fs = require('fs');

p1 = (data) => {
    return data.map(isSafe)
    .filter(x => !!x)
    .length
};

p2 = (data) => {
    return data.map(isSafeDampened)
    .filter(x => !!x)
    .length
}

isSafe = (reading) => {
    let isIncreasing = reading[1] > reading[0];
    let prev = reading[0];

    for (let i = 1; i < reading.length; i++) {
        if (Math.abs(reading[i] - prev) > 3 || Math.abs(reading[i] - prev) == 0) 
            return false

        if (reading[i] > prev != isIncreasing)
            return false

        prev = reading[i]
    }

    return true
}

isSafeDampened = (reading) => {
    let valid = isSafe(reading)

    if (valid)
        return true

    let permutations = [];
    for (let i = 0; i < reading.length; i++) {
        let perm = [...reading]
        perm.splice(i, 1)
        permutations.push(perm)
    }

    return permutations.map(isSafe).filter(x => !!x).length >= 1
}

parse = (data) => {
    return data.split('\r\n')
               .map(x => x.split(' ').map(y => parseInt(y)))
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