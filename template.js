const fs = require('fs');

p1 = () => {


    return null
};

p2 = () => {


    return null
}

parse = (data) => {
    return data;
}

main = async () => {
    await fs.readFile('./{{DAY}}.txt', 'utf8', async (err, data) => {
        data = parse(data)

        console.log('part 1:', p1(structuredClone(data)));
        console.log('part 2:', p2(structuredClone(data)));
    });
}

main();