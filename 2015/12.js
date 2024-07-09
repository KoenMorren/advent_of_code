const fs = require('fs');

p1 = (data) => {
    const regex = /-?[0-9]\d*/g;

    return [...data.matchAll(regex)]
            .map(x => parseInt(x[0]))
            .reduce((p, c) => p + c, 0)
}

p2 = (data) => {
    return null
}

main = async () => {
    await fs.readFile('./12.txt', 'utf8', async (err, data) => {
        console.log('part 1:', p1(structuredClone(data)));
        console.log('part 2:', p2(structuredClone(data)));
    });
}

main();