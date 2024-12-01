const fs = require('fs');

p1 = (data) => {
    var left, right;
    [left, right] = data.reduce((p, c) => {
        p[0].push(c[0])
        p[1].push(c[1])
        return p
    }, [[],[]]);

    left = left.sort((a, b) => a - b)
    right = right.sort((a, b) => a - b)

    let distance = 0
    for (let i = 0; i < left.length; i++) {
        distance += Math.max(left[i], right[i]) - Math.min(left[i], right[i])
    }

    return distance
};

p2 = (data) => {
    var dict = {}
    var left, right;
    [left, right] = data.reduce((p, c) => {
        p[0].push(c[0])
        p[1].push(c[1])
        return p
    }, [[],[]]);

    let similarity = 0
    for (let i = 0; i < left.length; i++) {
        if (dict[left[i]] == null) {
            let count = 0;
            for (let j = 0; j < right.length; j++) {
                if (right[j] === left[i]) {
                    count++
                }
            }

            dict[left[i]] = count
        }

        similarity += left[i] * dict[left[i]]
    }

    return similarity
}

parse = (data) => {
    const regex = /(\d+)\s+(\d+)/;

    return data.split('\r\n')
               .map(x => regex.exec(x))
               .map(x => [parseInt(x[1]), parseInt(x[2])])
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