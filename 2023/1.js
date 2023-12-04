const fs = require('fs');

p1 = async () => {
    await fs.readFile('./1_input.txt', 'utf8', (err, data) => {
        data = data.split('\n');

        // part 1
        const expr = /\d/g;
        let total = 0;
        data.forEach(element => {
            const digits = element.match(expr);
            total += parseInt(digits[0] + digits[digits.length - 1])
        });

        console.log("Part 1", total);
    });
};

p2 = async () => {
    await fs.readFile('./1_input.txt', 'utf8', (err, data) => {
        data = data.split('\n');

        // part 2
        const expr = /[0-9]|(?=(zero|one|two|three|four|five|six|seven|eight|nine))/g;
        const dict = {
            0:'0',
            1:'1',
            2:'2',
            3:'3',
            4:'4',
            5:'5',
            6:'6',
            7:'7',
            8:'8',
            9:'9',
            'zero':'0',
            'one': '1',
            'two': '2',
            'three':'3',
            'four':'4',
            'five':'5',
            'six':'6',
            'seven':'7',
            'eight':'8',
            'nine':'9',
        }
        let total = 0;
        data.forEach(element => {
            const digits = [...element.matchAll(expr)].map(x => x[0] || x[1])
            total += parseInt(dict[digits[0]] + dict[digits[digits.length - 1]])
        });

        console.log("Part 2", total);
    });
};

main = async () => {
    await p1();
    await p2();
}

main();