const fs = require('fs');

p1 = (data) => {
    return data[0][1] + 1
};

p2 = (data) => {
    return data.reduce((p, c, i, arr) => {
        p += (arr[i + 1] || [4294967295])[0] - (c[1] + 1)
        
        return p
    }, 0) + 1
}

reduceRanges = (ranges) => {
    return ranges.reduce((p, c) => {
        if (!p[p.length - 1]) {
            p.push(c)
            return p
        }
        
        if (p[p.length - 1][1] + 1 >= c[0]) {
            if (p[p.length - 1][1] < c[1])
                p[p.length - 1][1] = c[1]
        } else 
            p.push(c)

        return p
    }, [])
}

parse = (data) => {
    return data.split('\r\n')
               .map(x => x.split('-').map(y => parseInt(y)))
               .sort((a, b) => a[0] - b[0]);
}

main = async () => {
    await fs.readFile('./20.txt', 'utf8', async (err, data) => {
        const reducedRanges = reduceRanges(parse(data))

        console.log('part 1:', measure(() => p1(reducedRanges)));
        console.log('part 2:', measure(() => p2(reducedRanges)));
    });
}

measure = (fn) => {
    const start = performance.now();
    let result = fn();
    const end = performance.now();

    return `${result} (${Math.round((end - start) * 10000) / 10000} ms)`;
}

main();