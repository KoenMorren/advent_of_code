const fs = require('fs');

main = () => {
    fs.readFile('./3_input.txt', 'utf8', (err, data) => {
        // Part 1
        console.log('Part 1',
            data.split('\n')
                .map(compare)
                .map(priority)
                .reduce((prev, curr) => prev + curr, 0)
        )

        // Part 2
        console.log('Part 2',
            data.split('\n')
                .reduce(chunk, [])
                .map(unique)
                .map(priority)
                .reduce((prev, curr) => prev + curr, 0)
        )
    });
};

compare = (rucksack) => {
    var p1 = rucksack.slice(0, rucksack.length / 2);
    var p2 = rucksack.slice(rucksack.length / 2);

    for (var i = 0; i < p1.length; i++) {
        if (p2.indexOf(p1[i]) !== -1) return p1[i]
    }
}

chunk = (prev, curr, i) => {
    if (i % 3 === 0) prev.push([]);

    prev[prev.length - 1].push(curr);
    return prev;
}

unique = (rucksack) => {
    for (var i = 0; i < rucksack[0].length; i++) {
        if (rucksack[1].indexOf(rucksack[0][i]) !== -1 && rucksack[2].indexOf(rucksack[0][i]) !== -1)
            return rucksack[0][i];
    }
}

priority = (letter) => {
    var isUpperCase = /[A-Z]/g.test(letter)

    return letter.charCodeAt(0) - (isUpperCase ? 38 : 96)
}

main();