const fs = require('fs');

p1 = async () => {
    await fs.readFile('./11_input.txt', 'utf8', (err, data) => {
        data = parse(data);

        const result = findGalaxies(data.map)
                            .map(x => calculateDistance(x, data.emptyRows, data.emptyCols, 2))
                            .reduce((p, c) => p + c.distance, 0)

        console.log("Part 1", result);
    });
};

p2 = async () => {
    await fs.readFile('./11_input.txt', 'utf8', (err, data) => {
        data = parse(data);

        const result = findGalaxies(data.map)
                            .map(x => calculateDistance(x, data.emptyRows, data.emptyCols, 1000000))
                            .reduce((p, c) => p + c.distance, 0)
        
        console.log("Part 2", result);
    });
};

parse = (data) => {
    data = data.split('\n');

    let map = []
    let emptyRows = []
    let emptyCols = []

    map = data.map(x => [...x])

    for (let i = 0; i < map.length; i++) {
        if (map[i].filter(y => y !== '.').length === 0)
            emptyRows.push(i)
    }

    for (let i = 0; i < map[0].length; i++) {
        if (columnIsEmpty(map, i))
            emptyCols.push(i)
    }
    
    return {
        map: map,
        emptyRows: emptyRows,
        emptyCols: emptyCols
    };
}

columnIsEmpty = (data, index) => {
    return data.reduce((p, c) => p && c[index] === '.', true);
}

findGalaxies = (map) => {
    let galaxies = [];

    for(let i = 0; i < map.length; i++) {
        for(let j = 0; j < map[i].length; j++) {
            if (map[i][j] === '#')
                galaxies.push([i, j])
        }
    }

    galaxies = galaxies.map((x, i) => { return { id: i + 1, x: x[0], y: x[1]}})

    // generate all combinations of the galaxies in the array
    return galaxies.flatMap((v, i) => galaxies.slice(i + 1).map(x => [v, x]))
}

calculateDistance = (galaxyPair, emptyRows, emptyCols, scale) => {
    let horizontalNodes = [...Array(Math.max(galaxyPair[0].x, galaxyPair[1].x) - Math.min(galaxyPair[0].x, galaxyPair[1].x)).keys()].map(x => x + Math.min(galaxyPair[0].x, galaxyPair[1].x));
    let verticalNodes = [...Array(Math.max(galaxyPair[0].y, galaxyPair[1].y) - Math.min(galaxyPair[0].y, galaxyPair[1].y)).keys()].map(x => x + Math.min(galaxyPair[0].y, galaxyPair[1].y));

    return {
        id: `${galaxyPair[0].id}-${galaxyPair[1].id}`,
        distance: horizontalNodes.length + (horizontalNodes.filter(x => emptyRows.indexOf(x) !== -1).length * scale) - horizontalNodes.filter(x => emptyRows.indexOf(x) !== -1).length
                  + verticalNodes.length + (verticalNodes.filter(x => emptyCols.indexOf(x) !== -1).length * scale) - verticalNodes.filter(x => emptyCols.indexOf(x) !== -1).length
    }
}

main = async () => {
    await p1();
    await p2();
}

main();