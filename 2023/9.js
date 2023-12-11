const fs = require('fs');

p1 = async () => {
    await fs.readFile('./9_input.txt', 'utf8', (err, data) => {
        data = data.split('\n');

        const result = data.map(x => x.split(' '))
                           .map(x => x.map(y => parseInt(y)))
                           .map(generateDifferences)
                           .map(generateNextValue)
                           .reduce((p, c) => p + c, 0)

        console.log("Part 1", JSON.stringify(result, null, 2));
    });
};

p2 = async () => {
    await fs.readFile('./9_input.txt', 'utf8', (err, data) => {
        data = data.split('\n');

        const result = data.map(x => x.split(' '))
                           .map(x => x.map(y => parseInt(y)))
                           .map(generateDifferences)
                           .map(generatePreviousValue)
                           .reduce((p, c) => p + c, 0)

        console.log("Part 2", result);
    });
};

generateDifferences = (sequence) => {
    let diffs = [sequence]
               
    while (diffs[diffs.length - 1].filter(x => x !== 0).length > 0) {
        const prev = diffs.length - 1;
        diffs[prev + 1] = []

        for(let i = 0; i < diffs[prev].length - 1; i++) {
            diffs[diffs.length - 1].push(diffs[prev][i + 1] - diffs[prev][i])
        }
    }

    return diffs;
}

generateNextValue = (differences) => {
    return differences.reduce((p, c) => p + c[c.length - 1], 0)
}

generatePreviousValue = (differences) => {
    return differences.reduce((p, c) => c[0] - p, 0)
}

main = async () => {
    await p1();
    await p2();
}

main();