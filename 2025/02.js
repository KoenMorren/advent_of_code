const fs = require('fs');

work = (data, callback) => {
    let hits = [];

    data.forEach((p) => {
        for (var i = p.start; i <= p.end; i++) {
            var s = i.toString()
            // only works for the first problem
            // for the second problem, there are numbers of uneven length that should be taken into account, ie. 55555
            // if (s.length % 2 == 1) {
            //     i = 10**s.length - 1 // -1 because the i++ from the loop follows
            // }

            if (callback(s))
                hits.push(i)
        }
    })

    return hits.reduce((p, c) => p + c, 0)
}

p1 = (data) => {
    const callback = (s) => {
        return (s.substring(0, s.length / 2) == s.substring(s.length / 2))
    };
    return work(data, callback)
};

p2 = (data) => {
    const callback = (s) => {
        let l = 1;
        while (l <= s.length / 2) {
            if (s.substring(0, l).repeat(s.length / l) == s)
                return true

            l++
        }

        return false;
    };
    return work(data, callback)
}

parse = (data) => {
    return data.split(',')
               .map(x => { const y = x.split('-'); return {start: +y[0], end: +y[1]};})
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