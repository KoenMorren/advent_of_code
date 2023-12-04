const fs = require('fs');

p1 = async () => {
    await fs.readFile('./4_input.txt', 'utf8', (err, data) => {
        data = data.split('\n');

        let total = 0;
        data.forEach(x => {
            const game = x.split(': ');

            let [numbers, winningNumbers] = game[1].split(' | ')
            numbers = numbers.split(' ').map(y => parseInt(y))
            winningNumbers = winningNumbers.split(' ').map(y => parseInt(y))

            const exp = numbers.filter(y => winningNumbers.indexOf(y) !== -1).length - 1;
            
            const gameValue = exp < 0 ? 0 : 2 ** exp;
            total += gameValue
        });

        console.log("Part 1", total);
    });
};

p2 = async () => {
    await fs.readFile('./4_input.txt', 'utf8', (err, data) => {
        data = data.split('\n');

        let cards = new Array(data.length).fill(1);

        for (let i = 0; i < data.length; i++) {
            const game = data[i].split(': ');

            let [numbers, winningNumbers] = game[1].split(' | ')
            numbers = numbers.split(' ').map(y => parseInt(y))
            winningNumbers = winningNumbers.split(' ').map(y => parseInt(y))

            const matches = numbers.filter(y => winningNumbers.indexOf(y) !== -1).length;
            
            for (let j = 1; j <= matches; j++) {
                cards[i + j] += cards[i]
            }
        }
        
        console.log("Part 2", cards.reduce((p, c) => p + c, 0));
    });
};

main = async () => {
    await p1();
    await p2();
}

main();