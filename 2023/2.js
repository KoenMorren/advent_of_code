const fs = require('fs');

p1 = async () => {
    await fs.readFile('./2_input.txt', 'utf8', (err, data) => {
        data = data.split('\n');

        const limits = {
            'red': 12,
            'green': 13,
            'blue': 14
        }

        let total = 0;

        data.forEach(x => {
            const game = x.split(': ');
            const gameId = parseInt(game[0].split(' ')[1]);

            const grabs = game[1].split('; ');

            let possible = true;
            grabs.forEach(y => {
                y.split(', ')
                 .forEach(z => {
                    if (limits[z.split(' ')[1]] < parseInt(z.split(' ')[0])) 
                        possible = possible && false;
                 })
            });

            if (possible)
                total += gameId;
        });

        console.log("Part 1", total);
    });
};

p2 = async () => {
    await fs.readFile('./2_input.txt', 'utf8', (err, data) => {
        data = data.split('\n');

        let total = 0;

        data.forEach(x => {
            const grabs = x.split(': ')[1].split('; ');

            let minimum = {
                'red': 0,
                'green': 0,
                'blue': 0
            }

            grabs.forEach(y => {
                y.split(', ')
                 .forEach(z => {
                    minimum[z.split(' ')[1]] = Math.max(minimum[z.split(' ')[1]], parseInt(z.split(' ')[0]))
                 })
            });

            total += minimum['red'] * minimum['green'] * minimum['blue']

        });

        console.log("Part 2", total);
    });
};

main = async () => {
    await p1();
    await p2();
}

main();