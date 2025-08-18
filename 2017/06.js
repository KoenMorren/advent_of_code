const fs = require('fs');

base = (data) => {
    let configurations = []

    while (configurations.indexOf(makeConfiguration(data)) === -1) {
        configurations.push(makeConfiguration(data))
        
        // find highest
        let indexWithHighestBlocks = findHighest(data)
        // empty
        let toDistribute = data[indexWithHighestBlocks]
        data[indexWithHighestBlocks] = 0
        // distribute over others
        while(toDistribute > 0) {
            indexWithHighestBlocks = (indexWithHighestBlocks + 1) % data.length
            data[indexWithHighestBlocks]++
            toDistribute--
        }
    }

    configurations.push(makeConfiguration(data))

    return configurations

    function findHighest(a) {
        let highest = 0

        for(let i = 1; i < a.length; i++) {
            if (a[i] > a[highest])
                highest = i
        }

        return highest
    }

    function makeConfiguration(a) {
        return a.join('|')
    }
}

p1 = (data) => {
    let configurations = base(structuredClone(data))
    return configurations.length - 1
};

p2 = (data) => {
    let configurations = base(data)
    let last = configurations[configurations.length - 1]
    let firstIndex = configurations.findIndex((x) => x == last)

    return configurations.length - 1 - firstIndex
}

parse = (data) => {
    return data.split(/[\r\n]+/)[0]
               .split('\t')
               .map(x => +x)
}

main = async () => {
    await fs.readFile('./06.txt', 'utf8', async (err, data) => {
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