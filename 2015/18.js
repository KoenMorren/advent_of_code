const fs = require('fs');
const iterations = 100;

p1 = (data) => {
    for (let it = 0; it < iterations; it++) {
        let transformed = structuredClone(data)

        for(let i = 0; i < data.length; i++) {
            for(let j = 0; j < data.length; j++) {
                let litNeighbours = countLitNeighbours(data, i, j);

                transformed[i][j] = determineState(data[i][j], litNeighbours)
            }
        }

        data = structuredClone(transformed)
    }

    return data.reduce((p, c) => p + c.reduce((q, d) => q + d, 0), 0)
}

p2 = (data) => {
    for (let it = 0; it < iterations; it++) {
        let transformed = structuredClone(data)

        for(let i = 0; i < data.length; i++) {
            for(let j = 0; j < data.length; j++) {
                let litNeighbours = countLitNeighbours(data, i, j);

                if ((i === 0 && j === 0)
                    || (i === 0 && j === data.length - 1)
                    || (i === data.length - 1 && j === 0)
                    || (i === data.length - 1 && j === data.length - 1)
                )
                    transformed[i][j] = 1
                else
                    transformed[i][j] = determineState(data[i][j], litNeighbours)
            }
        }

        data = structuredClone(transformed)
    }

    return data.reduce((p, c) => p + c.reduce((q, d) => q + d, 0), 0)
}

parseData = (data) => {
    return data.split('\r\n')
               .map(x => x.split('').map(y => y === '.' ? 0 : 1))
        
}

countLitNeighbours = (grid, i, j) => {
    const offsets = [-1, 0, 1];
    let neighbours = 0;

    for (const x of offsets) {
        for (const y of offsets) {
            if (x === 0 && y === 0) continue; // Skip the cell itself
            const newRow = i + x;
            const newCol = j + y;
            if (newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid[0].length) {
                neighbours += grid[newRow][newCol];
            }
        }
    }

    return neighbours;
}

determineState = (state, litNeighbours) => {
    if (state === 1 && (litNeighbours === 2 || litNeighbours === 3)
        || state === 0 && litNeighbours === 3)
        return 1
    else return 0
}

print = (grid) => {
    return '\r\n' + grid.map(x => x.join('').replace(/0/g, '.').replace(/1/g, '#'))
        .join('\r\n')
}

main = async () => {
    if (!Array.prototype.last) {
        Array.prototype.last = function() {
            return this[this.length - 1]
        }
    }
    
    await fs.readFile('./18.txt', 'utf8', async (err, data) => {
        data = parseData(data)

        console.log('part 1:', p1(structuredClone(data)));
        console.log('part 2:', p2(structuredClone(data)));
    });
}

main();