const fs = require('fs');

const scoring = {
    'X' : 1,
    'Y' : 2,
    'Z' : 3
};
const rps = {
    'A' : {
        'Z' : 0,
        'X' : 3,
        'Y' : 6,
    },
    'B' : {
        'X' : 0,
        'Y' : 3,
        'Z' : 6,
    },
    'C' : {
        'Y' : 0,
        'Z' : 3,
        'X' : 6,
    },
};
const outcome = {
    'X' : 0,
    'Y' : 1,
    'Z' : 2
}

main = () => {
    fs.readFile('./2_input.txt', 'utf8', (err, data) => {
        // Part 1
        console.log ("Part 1",
            data.split('\n')
                .map(x => score(...x.split(' ')))
                .reduce((prev, curr) => prev + curr, 0)
        );

        // Part 2
        console.log ("Part 2",
            data.split('\n')
                .map(x => score2(x.split(' ')[0], outcome[x.split(' ')[1]]))
                .reduce((prev, curr) => prev + curr, 0)
        );
    });
};

score = (opp, you) => {
    return rps[opp][you] + scoring[you];
};
score2 = (opp, you) => {
    var k = Object.keys(rps[opp])[you];
    return rps[opp][k] + scoring[k];
};

main();