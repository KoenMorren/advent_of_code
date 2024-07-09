const fs = require('fs');

p1 = (data) => {
    const regex = /-?[0-9]\d*/g;

    let arrangements = makeArrangements(data);

    return arrangements.sort((a, b) => a[1] - b[1]).last()[1]
}

p2 = (data) => {
    let people = Array.from(new Set(data.map(x => [x[0], x[3]])
                            .reduce((p, c) => [...p, ...c], [])
                        )).filter(x => !!x)

    let additions = people.map(x => { return [
        [x, 'Me', 0],
        ['Me', x, 0]
    ]}).reduce((p, c) => [...p, ...c], [])

    data = [...data, ...additions]
    
    let arrangements = makeArrangements(data);

    return arrangements.sort((a, b) => a[1] - b[1]).last()[1]
}

parseData = (data) => {
    const regex = /([a-zA-Z]*)( would )(gain|lose)( )(\d*)( happiness units by sitting next to )([a-zA-Z]*)/;

    return data.split('\n')
        .map(x => regex.exec(x))
        .map(x => [x[1], x[3], parseInt(x[5]), x[7]])
        .map(x => {
            return [
                x[0],
                x[3],
                x[1] === 'lose' ? x[2] * -1 : x[2]
            ]
        })
}

makeArrangements = (data) => {
    let people = Array.from(new Set(data.map(x => [x[0], x[3]])
                          .reduce((p, c) => [...p, ...c], [])
                    )).filter(x => !!x)

    let arrangements = [];
    people.forEach(p => {
        next(data, [p], people.length, arrangements)
    });

    arrangements = arrangements.map(x => {
        let score = 0;

        for(let i = 0; i < people.length; i++) {
            score += data.filter(d => d[0] === x[i] && d[1] === x[i+1])[0][2]
            score += data.filter(d => d[0] === x[i+1] && d[1] === x[i])[0][2]
        }

        return [x, score]
    })

    return arrangements;
}

next = (graph, arrangement, amountOfPeople, arrangements) => {
    if (arrangement.length === amountOfPeople) {
        let closer = graph.filter(x => x[0] === arrangement.last())
                          .filter(x => x[1] === arrangement[0])[0]

        arrangement.push(closer[1])

        arrangements.push(arrangement)
        return
    }

    let neighbours = graph.filter(x => x[0] === arrangement.last())
                          .filter(x => arrangement.indexOf(x[1]) === -1);

    neighbours.forEach(n => {
        next(graph, [...arrangement, n[1]], amountOfPeople, arrangements)
    })
}

main = async () => {
    if (!Array.prototype.last) {
        Array.prototype.last = function() {
            return this[this.length - 1]
        }
    }

    // Make all possible permutations of the people
    // (Optimisation) Filter out shifted permutations (ABC == BCA) // not done here
    // Calc score for the arrangement

    await fs.readFile('./13.txt', 'utf8', async (err, data) => {
        data = parseData(data)
        
        console.log('part 1:', p1(structuredClone(data)));
        console.log('part 2:', p2(structuredClone(data)));
    });
}

main();