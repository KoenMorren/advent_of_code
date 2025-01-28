const fs = require('fs');

p1 = (data) => {
    return data
        .map(e => {
            let sols = []

            for (let i = 0; i <= 100; i++) {
                let x = i * e.A.x
                let y = i * e.A.y

                if (x > e.prize.x || y > e.prize.y)
                    break

                for (let j = 0; j <= 100; j++) {
                    if (x + (j * e.B.x) > e.prize.x || y + (j * e.B.y) > e.prize.y)
                        break

                    if (x + (j * e.B.x) == e.prize.x && y + (j * e.B.y) == e.prize.y)
                        sols.push([i, j])
                }

                if (x == e.prize.x && y == e.prize.y)
                    sols.push([i, j])
            }

            return sols
                .map(x => x[0] * 3 + x[1])
                .sort((a, b) => a - b)
                [0]
        })
        .tap(console.log)
        .filter(x => !!x)
        .tap(console.log)
        .reduce((p, c) => p + c, 0)
};

p2 = (data) => {

    // let A = 94
    // let B = 22
    // // let solX = 10000000000000 + 8400
    // let solX = 8400

    // let i = 0

    // while (true) {
    //     if ((solX - (B * i)) % A !== 0) {
    //         i++ 
    //         continue
    //     }

    //     let j = Math.floor((solX - (B * i)) / A)

    //     if (A*j + B*i == solX)
    //         break

    //     i++
    // }

    // return i

    
}

parse = (data) => {
    data = data.split('\n').filter(x => !!x);

    let parsed = []
    let regex = /.*X[\+\=](\d*)\,\sY[\+\=](\d*)/

    for (let i = 0; i < data.length; i+=3) {
        let machine = {
            A: {
                x: +data[i].match(regex)[1],
                y: +data[i].match(regex)[2],
            },
            B: {
                x: +data[i + 1].match(regex)[1],
                y: +data[i + 1].match(regex)[2],
            },
            prize: {
                x: +data[i + 2].match(regex)[1],
                y: +data[i + 2].match(regex)[2],
            }
        }

        parsed.push(machine)
    }

    return parsed
}

main = async () => {
    if (!Array.prototype.tap) {
        Array.prototype.tap = function(callback) {
            // this.forEach(x => callback(x))

            return this;
        }
    }

    await fs.readFile('./13.txt', 'utf8', async (err, data) => {
        data = parse(data)

        // data = [
        //     {
        //         A: {
        //             x: 94,
        //             y: 34
        //         }, 
        //         B: {
        //             x: 22,
        //             y: 67
        //         },
        //         prize: {
        //             x: 8400,
        //             y: 5400
        //         }
        //     }
        // ]

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