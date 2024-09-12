const fs = require('fs');

p1 = (data) => {
    const routes = buildRoutes(data);

    return routes.sort((a, b) => a[1] - b[1])[0][1]
}

p2 = (data) => {
    const routes = buildRoutes(data);

    return routes.sort((a, b) => b[1] - a[1])[0][1]
}

buildGraph = (input) => {
    var regex = /([a-zA-Z]*)( to )([a-zA-Z]*)( \= )(\d*)/;

    return input.split('\n')
                .map(x => regex.exec(x))
                .map(x => [[x[1], x[3], parseInt(x[5])], [x[3], x[1], parseInt(x[5])]])
                .reduce((p, c) => [...p, ...c], [])
}

buildRoutes = (graph) => {
    const starts = graph.map(x => x[0]).filter((value, index, array) =>  array.indexOf(value) === index)
    let routes = [...starts]
    let paths = [];

    routes.forEach(route => {
        goToNext(graph, [route], 0, starts.length, paths)
    })

    return paths;
}

goToNext = (graph, path, distance, locationAmount, paths) => {
    if (path.length === locationAmount) {
        paths.push([path, distance])
        return
    }

    let nextLocations = graph.filter(x => x[0] === path.last())
                             .filter(x => path.indexOf(x[1]) === -1);

    nextLocations.forEach(location => {
        goToNext(graph, [...path, location[1]], distance + location[2], locationAmount, paths)
    });
}

main = async () => {
    if (!Array.prototype.last){
        Array.prototype.last = function(){
            return this[this.length - 1];
        };
    };
    
    await fs.readFile('./09.txt', 'utf8', async (err, data) => {
        data = buildGraph(data)

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