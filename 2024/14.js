const fs = require('fs');

p1 = (data) => {
    let x = 101
    let y = 103

    let t = 100
    let i = 0

    while (i < t) {
        data = data.map(moveRobot(x, y));   
        i++
    }

    return data
        .reduce((p, r) => {
            if (r.p.x < (x - 1) / 2 && r.p.y < (y - 1) / 2)
                p[0]++
            if (r.p.x > (x - 1) / 2 && r.p.y < (y - 1) / 2)
                p[1]++
            if (r.p.x < (x - 1) / 2 && r.p.y > (y - 1) / 2)
                p[2]++
            if (r.p.x > (x - 1) / 2 && r.p.y > (y - 1) / 2)
                p[3]++

            return p
        }, [0, 0, 0, 0])
        .reduce((p, c) => p * c, 1)
};

p2 = (data) => {
    let x = 101
    let y = 103

    let i = 0

    // Check to see if all the robots are on a unique spot
    // Not sure why this is a solution to the problem
    // But as you dont know what the easter egg is supposed to look like, this seems fine?
    while (data.filter((r, i, arr) => arr.filter(x => x.p.x === r.p.x && x.p.y === r.p.y).length === 1).length !== data.length) {
        data = data.map(moveRobot(x, y));   

        i++
    }

    // print(x, y, data)

    return i
}

moveRobot = (maxX, maxY) => {
    return (robot) => {
        robot.p.x = determineNewPosition(robot.p.x, robot.v.x, maxX)
        robot.p.y = determineNewPosition(robot.p.y, robot.v.y, maxY)

        return robot
    }
}

determineNewPosition = (curr, velocity, max) => {
    let n = curr + velocity

    if (n < 0) {
        n += max
    }

    return n % max
}


print = (x, y, data) => {
    let arr = new Array(y).fill(0)
    arr = arr.map(_ => new Array(x).fill(0))

    data.forEach(r => {
        // console.log(r)
        arr[r.p.y][r.p.x]++
    })

    console.log(arr.map(x => x.join('').replaceAll('0', '.')).join('\n'))
}

parse = (data) => {
    return data
        .split('\n')
        .map(x => {
            let parts = x.split(' ')
            let p = parts[0].split('=')[1].split(',')
            let v = parts[1].split('=')[1].split(',')

            return {
                p: {
                    x: +p[0],
                    y: +p[1]
                },
                v: {
                    x: +v[0],
                    y: +v[1]
                },
            }
        });
}

main = async () => {
    if (!Array.prototype.tap) {
        Array.prototype.tap = function(callback) {
            this.forEach(x => callback(x))

            return this;
        }
    }

    await fs.readFile('./14.txt', 'utf8', async (err, data) => {
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