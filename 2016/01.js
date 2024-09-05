const fs = require('fs');


p1 = (data) => {
    var currentDirection = 0
    var pos = [0, 0]

    data.forEach(instruction => {
        currentDirection = determineDirection(currentDirection, instruction[0])

        pos[currentDirection % 2] += instruction[1] * (currentDirection >= 2 ? 1 : -1)
    });

    return pos.reduce((p, c) => p + Math.abs(c), 0)
};

p2 = (data) => {
    var currentDirection = 0
    var pos = [0, 0]

    var history = []
    var visitedTwice = []

    for (let d = 0; d < data.length; d++) {
        currentDirection = determineDirection(currentDirection, data[d][0])

        for (let i = 1; i <= data[d][1]; i++) {
            pos[currentDirection % 2] += 1 * (currentDirection >= 2 ? 1 : -1)
            
            if (visitedTwice.length === 0 
                && history.filter(x => x[0] === pos[0] && x[1] === pos[1]).length > 0) {
                    visitedTwice = structuredClone(pos)
                    break
                }

            history.push(structuredClone(pos))
        }

        if (visitedTwice.length > 0)
            break
    }

    return pos.reduce((p, c) => p + Math.abs(c), 0)
}

determineDirection = (currentDirection, instruction) => {
    if (instruction[0] === 'R')
        return (currentDirection + 1) % 4
    else 
        return (currentDirection > 0 ? currentDirection - 1 : 3) % 4
}

parse = (data) => {
    return data.split(', ')
               .map(x => [x.substring(0, 1), parseInt(x.substring(1))]);
}

main = async () => {
    await fs.readFile('./01.txt', 'utf8', async (err, data) => {
        data = parse(data)

        console.log('part 1:', p1(structuredClone(data)));
        console.log('part 2:', p2(structuredClone(data)));
    });
}

main();