const fs = require('fs');

const MOVEMENT = [
    {x: 0, y: -1}, // UP
    {x: 1, y: 0},  // RIGHT
    {x: 0, y: 1},  // DOWN
    {x: -1, y: 0}, // LEFT
]

p1 = (data) => {
    console.log(data.length, data[0].length)

    let guard = findGuard(data)
    let guardMovementDirection = 0
    let visited = new Set();

    while (guard.y >= 0 
           && guard.y < data.length
           && guard.x >= 0
           && guard.x < data[0].length
    ) {
        console.log(`${guard.y}:${guard.x}`)
        visited.add(`${guard.y}:${guard.x}`)
        //move guard
        let movement = MOVEMENT[guardMovementDirection]
        console.log(guard.y + movement.y, guard.x + movement.x)
        let projectedLocation = data[guard.y + movement.y][guard.x + movement.x]

        if (projectedLocation === "#") {
            guardMovementDirection = (guardMovementDirection + 1) % 4
            movement = MOVEMENT[guardMovementDirection]
            projectedLocation = data[guard.y + movement.y][guard.x + movement.x]
        }

        guard.x += movement.x
        guard.y += movement.y
    }

    return visited.size
};

p2 = (data) => {
    let guard = findGuard(data)
    let guardMovementDirection = 0
    let visited = new Set();
    let counter = 0;

    while (guard.y >= 0 
           && guard.y < data.length
           && guard.x >= 0
           && guard.x < data[0].length
    ) {
        visited.add(`${guard.y}:${guard.x}:${guardMovementDirection}`)
        //move guard
        let movement = MOVEMENT[guardMovementDirection]
        let projectedLocation = data[guard.y + movement.y][guard.x + movement.x]

        if (projectedLocation === "#") {
            guardMovementDirection = (guardMovementDirection + 1) % 4
            movement = MOVEMENT[guardMovementDirection]
            projectedLocation = data[guard.y + movement.y][guard.x + movement.x]
        }

        let potentialTimeLoop = [guard.y + movement.y, guard.x + movement.x]
        let potentialTimeLoopMovement = MOVEMENT[(guardMovementDirection + 1) % 4]

        if (visited.has(`${potentialTimeLoop[0] + potentialTimeLoopMovement.y}:${potentialTimeLoop[0] + potentialTimeLoopMovement.x}:${(guardMovementDirection + 1) % 4}`))
            counter++

        guard.x += movement.x
        guard.y += movement.y
    }

    return counter
}

findGuard = (data) => {
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            if (data[i][j] === '^') {
                return {
                    x: j,
                    y: i
                }
            }
        }
    }
}

parse = (data) => {
    return data.split('\n')
               .map(x => x.split(''))
}

main = async () => {
    await fs.readFile('./06.txt', 'utf8', async (err, data) => {
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