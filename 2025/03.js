const fs = require('fs');

work = (data, callback) => {
    return data.map(callback)
               .reduce((p, c) => p + c, 0)
}

p1 = (data) => {
    const operator = (bank) => {
        for (let i = 9; i > 0; i--) {
            var index = bank.indexOf(i.toString(), 0);

            if (index == -1)
                continue;

            for (let j = 9; j > 0; j--) {
                var index2 = bank.indexOf(j.toString(), index + 1);

                if (index2 == -1)
                    continue;

                return +`${i}${j}`;
            }
        }
    };

    return work(data, operator)
};

p2 = (data) => {
    const operator = (bank) => {
        let hit = ''
        let newStart = 0

        while (hit.length < 12) {
            for (let i = 9; i > 0; i--) {
                let index = bank.substring(newStart, bank.length - 11 + hit.length).indexOf(i)
                
                if (index != -1) {
                    hit += i.toString()
                    newStart += index + 1
                    break;
                }
            }
        }

        return +hit
    }

    return work(data, operator)
}

parse = (data) => {
    return data.split(/[\r\n]+/)
}

main = async () => {
    await fs.readFile('./03.txt', 'utf8', async (err, data) => {
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