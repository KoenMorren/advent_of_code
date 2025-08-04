const fs = require('fs');

p1 = (data) => {
    return data.reduce((p, c) => {
        c.sort((a, b) => a - b)

        return p + (c[c.length - 1] - c[0])
    }, 0)
};

p2 = (data) => {
    return data.reduce((p, c) => {
        for(let i = 0; i < c.length - 1; i++) {
            for(let j = i + 1; j < c.length; j++) {
                let ci = c[i]
                let cj = c[j]

                if (ci % cj == 0 ) {
                    p += ci / cj
                    break
                }

                if (cj % ci == 0) {
                    p += cj / ci
                    break
                }
            }
        }

        return p
    }, 0)
}

parse = (data) => {
    return data.split(/[\r\n]+/)
               .map(x => x.split('\t').map(y => +y))
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