const fs = require('fs');

const dimension = 1000;

p1 = (data) => {
    const instructions = parse(data);
    const operations = {
        'turn on': (_) => 1,
        'turn off': (_) => 0,
        'toggle': (x) => (x * -1) + 1
    }
    
    let grid = executeInstructions(instructions, initialiseGrid(dimension), operations)

    const result = grid.map(x => x.reduce((p, c) => p + c, 0))
                        .reduce((p, c) => p + c, 0)

    return result
}

p2 = (data) => {
    const instructions = parse(data);
    const operations = {
        'turn on': (x) => x + 1,
        'turn off': (x) => Math.max(x - 1, 0),
        'toggle': (x) => x + 2
    }

    let grid = executeInstructions(instructions, initialiseGrid(dimension), operations)

    const result = grid.map(x => x.reduce((p, c) => p + c, 0))
                        .reduce((p, c) => p + c, 0)

    return result
}

parse = (input) => {
    const regex = /(turn on|turn off|toggle) (\d{1,3}),(\d{1,3}) through (\d{1,3}),(\d{1,3})/;

    return input.split('\r\n')
                .map(x => regex.exec(x))
                .map(x => [x[1], parseInt(x[2]), parseInt(x[3]), parseInt(x[4]), parseInt(x[5])])
}

initialiseGrid = (dim) => {
    let grid = [];

    for(let i = 0; i < dim; i++) {
        let row = new Array(dim).fill(0)
        grid.push(row)
    }

    return grid;
}

executeInstructions = (instructions, grid, operations) => {
    for(let instruction of instructions) {
        for (let i = instruction[1]; i <= instruction[3]; i++) {
            for (let j = instruction[2]; j <= instruction[4]; j++) {
                grid[i][j] = operations[instruction[0]](grid[i][j])
            }
        }
    }

    return grid;
}

main = async () => {
    await fs.readFile('./6.txt', 'utf8', async (err, data) => {
        console.log('part 1:', p1(structuredClone(data)));
        console.log('part 2:', p2(structuredClone(data)));
    });
}

main();