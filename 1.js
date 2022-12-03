const fs = require('fs');

main = ()  =>{
    fs.readFile('./1_input.txt', 'utf8', (err, data) => {
        var i = 0;
        var elves = [[]];
        data.split('\n').forEach((value) => {
            if (value === '') {
                i++;
                elves[i] = [];
            }
            else {
                elves[i].push(value);
            }
        });

        // part 1
        var max = elves
            .map(x => x.reduce((y, z) => parseInt(z) + y, 0))
            .sort((a, b) => b - a)
            [0];

        console.log("Part 1", max);

        // part 2
        var top3 = elves
            .map(x => x.reduce((y, z) => parseInt(z) + y, 0))
            .sort((a, b) => b - a)
            .slice(0, 3)
            .reduce((x, y) => x + y, 0);

        console.log("Part 2", top3);
    });
};

main();