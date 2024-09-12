const fs = require('fs');

p1 = (data) => {
    let grid = [
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9]
    ]

    const operations = {
        'U': (x, y, grid) => [x, Math.max(y - 1, 0)],
        'D': (x, y, grid) => [x, Math.min(y + 1, grid.length - 1)],
        'L': (x, y, grid) => [Math.max(x - 1, 0), y],
        'R': (x, y, grid) => [Math.min(x + 1, grid.length - 1), y],
    }

    let position = [1, 1];

    return executeInstructions(grid, operations, position, data)
};

p2 = (data) => {
    let grid = [
        [0, 0, 5, 0, 0],
        [0, 2, 6, 'A', 0],
        [1, 3, 7, 'B', 'D'],
        [0, 4, 8, 'C', 0],
        [0, 0, 9, 0, 0],
    ]

    const operations = {
        'U': (x, y, grid) => [x, grid[x][Math.max(y - 1, 0)] !== 0 ? Math.max(y - 1, 0) : y],
        'D': (x, y, grid) => [x, grid[x][Math.min(y + 1, grid.length - 1)] !== 0 ? Math.min(y + 1, grid.length - 1) : y],
        'L': (x, y, grid) => [grid[Math.max(x - 1, 0)][y] !== 0 ? Math.max(x - 1, 0) : x, y],
        'R': (x, y, grid) => [grid[Math.min(x + 1, grid.length - 1)][y] !== 0 ? Math.min(x + 1, grid.length - 1) : x, y],
    }

    let position = [0, 2];

    return executeInstructions(grid, operations, position, data)
}

executeInstructions = (grid, operations, position, data) => {
    return data.map(x => x.reduce((p, c, i, arr) => {
                    var t = operations[c](p[0], p[1], grid)

                    if (i === arr.length - 1) 
                        position = structuredClone(t)

                    return t
                }, position))
                .map(x => grid[x[0]][x[1]])
                .join('')
}

parse = (data) => {
    return data.split('\r\n')
               .map(x => x.split(''));
}

main = async () => {
    await fs.readFile('./02.txt', 'utf8', async (err, data) => {
        data = parse(data)

        console.log('part 1:', measure(() => p1(structuredClone(data))))
        console.log('part 2:', measure(() => p2(structuredClone(data))))
    });
}

measure = (fn) => {
    const start = performance.now();
    let result = fn();
    const end = performance.now();

    return `${result} (${Math.round((end - start) * 10000) / 10000} ms)`;
}

main();