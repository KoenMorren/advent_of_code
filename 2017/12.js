const fs = require('fs');

p1 = (data) => {
    var excludeList = [0]
    getConnectionsExcluding(data, '0', excludeList)

    return new Set(excludeList).size;

    
};

p2 = (data) => {
    var groups = 0
    var visited = []

    while (Object.keys(data).filter(x => visited.indexOf(+x) === -1).length > 0) {
        // get the next one
        var entry = +Object.keys(data).filter(x => visited.indexOf(+x) === -1)[0]
        var excludeList = [entry]
        getConnectionsExcluding(data, entry, excludeList)
        visited = [...visited, ...excludeList]
        groups++
    }

    return groups
}

function getConnectionsExcluding(data, entry, excludeList) {
    var connections = data[entry].filter(x => excludeList.indexOf(x) === -1)
    excludeList.push(...connections)

    connections.forEach(x => getConnectionsExcluding(data, x, excludeList));
}

parse = (data) => {
    return Object.fromEntries(data.split(/[\r\n]+/)
               .map(x => x.split(' <-> ').map(y => y.split(', ').map(z => +z)))
               .map(x => [x[0][0], x[1]]))
}

main = async () => {
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