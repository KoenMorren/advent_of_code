const fs = require('fs');

p1 = (data) => {
    callback = (antennaA, antennaB, offsetX, offsetY) => {
        return [
            [antennaA[0] - offsetY, antennaA[1] - offsetX],
            [antennaB[0] + offsetY, antennaB[1] + offsetX]
        ].filter(x => {
            return x[0] >= 0 && x[0] < data.length
                   && x[1] >= 0 && x[1] < data[0].length
        })
    }

    return solve(data, callback)
};

p2 = (data) => {
    callback = (antennaA, antennaB, offsetX, offsetY) => {
        let potentialAntinodes = [antennaA, antennaB]

        let newX = antennaA[1] - offsetX,
            newY = antennaA[0] - offsetY
        while(newX >= 0 && newX < data[0].length && newY >= 0 && newY < data.length) {
            potentialAntinodes.push([newY, newX])
            newX -= offsetX
            newY -= offsetY
        }

        newX = antennaA[1] + offsetX,
        newY = antennaA[0] + offsetY
        while(newX >= 0 && newX < data[0].length && newY >= 0 && newY < data.length) {
            potentialAntinodes.push([newY, newX])
            newX += offsetX
            newY += offsetY
        }

        return potentialAntinodes
    }

    return solve(data, callback)
}

solve = (data, potentialAntinodesCallback) => {
    let antennas = {}
    let antinodes = new Set();

    for (let i = 0; i < data.length; i ++) {
        for (let j = 0; j < data[i].length; j++) {
            if (data[i][j] === '.')
                continue
            
            if (Object.keys(antennas).indexOf(data[i][j]) === -1) {
                antennas[data[i][j]] = findAllMatches(data, i, j)
            }
        }
    }

    let keys = Object.keys(antennas)
    for (let k = 0; k < keys.length; k++) {
        for (let i = 0; i < antennas[keys[k]].length - 1; i++) {
            for (let j = i + 1; j < antennas[keys[k]].length; j++) {
                let antennaA = antennas[keys[k]][i], 
                antennaB = antennas[keys[k]][j]
                let offsetX = antennaB[1] - antennaA[1]
                let offsetY = antennaB[0] - antennaA[0]

                let potentialAntinodes = potentialAntinodesCallback(antennaA, antennaB, offsetX, offsetY)

                potentialAntinodes.forEach(x => antinodes.add(x.join(':')))
            }
        }
    }

    return antinodes.size
}

findAllMatches = (data, i, j) => {
    let matches = []

    for (let x = 0; x < data.length; x++) {
        for(let y = 0; y < data.length; y++) {
            if (data[x][y] === data[i][j])
                matches.push([x, y])
        }
    }

    return matches
}

parse = (data) => {
    return data.split('\n')
               .map(x => x.split(''))
}

main = async () => {
    await fs.readFile('./08.txt', 'utf8', async (err, data) => {
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