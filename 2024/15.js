const fs = require('fs');

const MOVEMENTS = {
    '<': (x, y) => [x - 1, y],
    '^': (x, y) => [x, y - 1],
    '>': (x, y) => [x + 1, y],
    'v': (x, y) => [x, y + 1],
}

p1 = (data) => {
    canMove = (grid, x, y, vector) => {
        let [x2, y2] = vector(x, y)
    
        switch(grid[y2][x2]) {
            case '.': return true
            case '#': return false
            default:  return canMove(grid, x2, y2, vector)
        }
    }
    
    move = (grid, x, y, vector, current) => {
        if (grid[y][x] === '.') {
            grid[y][x] = current
            return '.'
        }
    
        let c = grid[y][x]
        let [x2, y2] = vector(x, y)
    
        grid[y][x] = current
        
        return move(grid, x2, y2, vector, c)
    }

    data.instructions.forEach(i => {
        let vector = MOVEMENTS[i]

        if (canMove(data.grid, data.robot.x, data.robot.y, vector)) {
            data.grid[data.robot.y][data.robot.x] = move(data.grid, data.robot.x, data.robot.y, vector, data.grid[data.robot.y][data.robot.x])

            while (data.grid[data.robot.y][data.robot.x] !== '@') {
                let [x, y] = vector(data.robot.x, data.robot.y)
                data.robot.x = x
                data.robot.y = y
            }
        }
    })

    return data.grid
        .flatMap((r, y) => r.map((e, x) => e === 'O' ? (100 * y) + x : 0))
        .reduce((p, c) => p + c, 0)
};

p2 = (data) => {
    data.grid = data.grid.map(r => r.flatMap(e => {
        switch(e) {
            case '.': return ['.', '.'];
            case '@': return ['@', '.'];
            case 'O': return ['[', ']'];
            case '#': return ['#', '#'];
        }
    }))

    canMove = (grid, x, y, vector) => {
        let [x2, y2] = vector(x, y)
    
        switch(grid[y2][x2]) {
            case '.': return true
            case '#': return false
            case '[': return canMove(grid, x2, y2, vector) && canMove(grid, x2 + 1, y2, vector) // is this correct?
            case ']': return canMove(grid, x2 - 1, y2, vector) && canMove(grid, x2, y2, vector)
        }
    }

    // DO THE MAGIC

    return data.grid
        .flatMap((r, y) => r.map((e, x) => e === '[' ? (100 * y) + x : 0))
        .reduce((p, c) => p + c, 0)
}



print = (data) => {
    console.log(data.map(x => x.join('')).join('\n'))
}

parse = (data) => {
    let rows = data.split('\n')
    
    let robot = {
        x: -1,
        y: -1
    }

    let i = 0
    while(rows[i] !== '') {
        if (rows[i].indexOf('@') !== -1) {
            robot.x = rows[i].indexOf('@')
            robot.y = i
        }
        
        i++
    }

    return {
        robot: robot,
        grid: rows.slice(0, i).map(x => x.split('')),
        instructions: rows.slice(++i).map(x => x.split('')).reduce((p, c) => [...p, ...c], [])
    }
}

main = async () => {
    await fs.readFile('./15.txt', 'utf8', async (err, data) => {
        data = parse(data)

        console.log('part 1:', measure(() => p1(structuredClone(data))));
        console.log('part 2:', measure(() => p2(structuredClone(data))));
    });
}

measure = (fn) => {
    const start = performance.now();
    let result = fn();
    const end = performance.now();

    return `${result} (${Math.round((end - start) * 10000) / 10000} ms)`;
}

main();