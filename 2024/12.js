const fs = require('fs');

p1 = (data) => {
    // AREA * PERIMETER
    let fields = findFields(data)

    return fields.map(x => [x[0].length, x[1]])
                 .reduce((p, c) => p + c[0] * c[1], 0)
};

p2 = (data) => {
    // AREA * AMOUNT_OF_SIDES
    let fields = findFields(data)
        .map(f => {
            let corners = f[0].map(x => x.split(':').map(y => parseInt(y)))
                            //   .tap(console.log)
                              .map(x => determineCorners(data, ...x))
                              .reduce((p, c) => p + c, 0)

            return [f[0].length, corners]
        })

    return fields.reduce((p, c) => p + c[0] * c[1], 0)
}

findFields = (data) => {
    let visited = new Set()
    let fields = []

    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            let prev = visited.size
            visited.add(`${i}:${j}`)

            if (prev === visited.size) 
                continue

            fields.push(findNeighbours(data, visited, i, j))
        }
    }

    return fields;
}

findNeighbours = (data, visited, i, j) => {
    let species = data[i][j]

    let neighbours = [`${i}:${j}`]
    let perimeter = 4
    visited.add(`${i}:${j}`)

    if (i > 0 && data[i - 1][j] === species) {
        if (!visited.has(`${i - 1}:${j}`)) {
            let n = findNeighbours(data, visited, i - 1, j)
            neighbours.push(...n[0])
            perimeter += n[1]
        }
        perimeter--
    }
    if (i < data.length - 1 && data[i + 1][j] === species) {
        if (!visited.has(`${i + 1}:${j}`)) {
            let n = findNeighbours(data, visited, i + 1, j)
            neighbours.push(...n[0])
            perimeter += n[1]
        }
        perimeter--
    }
    if (j > 0 && data[i][j - 1] === species) {
        if (!visited.has(`${i}:${j - 1}`)) {
            let n = findNeighbours(data, visited, i, j - 1)
            neighbours.push(...n[0])
            perimeter += n[1]
        }
        perimeter--
    }
    if (j < data[i].length - 1 && data[i][j + 1] === species) {
        if (!visited.has(`${i}:${j + 1}`)) {
            let n = findNeighbours(data, visited, i, j + 1)
            neighbours.push(...n[0])
            perimeter += n[1]
        }
        perimeter--
    }

    return [neighbours, perimeter];
}

determineCorners = (data, x, y) => {
    cardinal = [(x-1, y), (x+1, y), (x, y-1), (x, y+1)]
    diagonal = [(x-1, y-1), (x-1, y+1), (x+1, y-1), (x+1, y+1)]

    let patterns = [
        [(data[x]||[])[y - 1] || '.', (data[x - 1]||[])[y - 1] || '.', (data[x - 1] || [])[y] || '.'], // ↖️
        [(data[x - 1]||[])[y] || '.', (data[x - 1]||[])[y + 1] || '.', (data[x] || [])[y + 1] || '.'], // ↗️
        [(data[x]||[])[y + 1]||'.', (data[x + 1]||[])[y + 1]||'.', (data[x + 1]||[])[y]||'.'],         // ↘️
        [(data[x + 1]||[])[y]||'.', (data[x + 1]||[])[y - 1]||'.', (data[x]||[])[y - 1]||'.'],         // ↙️
    ]
    .map(i => i.map(j => j !== data[x][y] ? '.' : data[x][y]).join(''))
    .filter(i => i === '...' || i === `${data[x][y]}.${data[x][y]}`)

    return patterns.length
}

parse = (data) => {
    return data.split('\n')
               .map(x => x.split(''));
}

main = async () => {
    if (!Array.prototype.tap) {
        Array.prototype.tap = function(callback) {
            this.forEach(x => callback(x))

            return this;
        }
    }
    
    await fs.readFile('./12.txt', 'utf8', async (err, data) => {
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