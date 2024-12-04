const fs = require('fs');

p1 = (data) => {
    let counter = 0;

    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            if (data[i][j] !== 'X')
                continue

            // Orthagonal
            // DOWN
            if (i + 3 < data[0].length) {
                if (data[i + 1][j] === 'M'
                    && data[i + 2][j] === 'A'
                    && data[i + 3][j] === 'S'
                ) {
                    print(data, [i, j], [i+1, j], [i+2, j], [i+3, j], 'DOWN')
                    counter++
                }
            }
            // UP
            if (i - 3 >= 0) {
                if (data[i - 1][j] === 'M'
                    && data[i - 2][j] === 'A'
                    && data[i - 3][j] === 'S'
                ) {
                    print(data, [i, j], [i-1, j], [i-2, j], [i-3, j], 'UP')
                    counter++
                }
            }
            // RIGHT
            if (j + 3 < data.length) {
                if (data[i][j + 1] === 'M'
                    && data[i][j + 2] === 'A'
                    && data[i][j + 3] === 'S'
                ) {
                    print(data, [i, j], [i, j+1], [i, j+2], [i, j+3], 'RIGHT')
                    counter++   
                }
            }
            // LEFT
            if (j - 3 >= 0) {
                if (   data[i][j - 1] === 'M'
                    && data[i][j - 2] === 'A'
                    && data[i][j - 3] === 'S'
                ) {
                    print(data, [i, j], [i, j-1], [i, j-2], [i, j-3], 'LEFT')
                    counter++
                }
            }

            // Diagonal
            if (i + 3 < data[0].length) {
                if (j - 3 >= 0) {
                    if (   data[i + 1][j - 1] === 'M'
                        && data[i + 2][j - 2] === 'A'
                        && data[i + 3][j - 3] === 'S'
                    ) {
                        print(data, [i, j], [i+1, j-1], [i+2, j-2], [i+3, j-3], "DOWN LEFT")
                        counter++
                    }
                }1
                if (j + 3 < data.length) {
                    if (   data[i + 1][j + 1] === 'M'
                        && data[i + 2][j + 2] === 'A'
                        && data[i + 3][j + 3] === 'S'
                    ) {
                        print(data, [i, j], [i+1, j+1], [i+2, j+2], [i+3, j+3], 'DOWN RIGHT')
                        counter++   
                    }
                }
            }
            if (i - 3 >= 0) {
                if (j - 3 >= 0) {
                    if (   data[i - 1][j - 1] === 'M'
                        && data[i - 2][j - 2] === 'A'
                        && data[i - 3][j - 3] === 'S'
                    ) {
                        print(data, [i, j], [i-1, j-1], [i-2, j-2], [i-3, j-3], 'UP LEFT')
                        counter++
                    }
                }
                if (j + 3 < data.length) {
                    if (   data[i - 1][j + 1] === 'M'
                        && data[i - 2][j + 2] === 'A'
                        && data[i - 3][j + 3] === 'S'
                    ) {
                        print(data, [i, j], [i-1, j+1], [i-2, j+2], [i-3, j+3], 'UP RIGHT')
                        counter++
                    }
                }
            }
        }   
    }

    return counter
};

p2 = (data) => {
    let counter = 0;

    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            if (data[i][j] !== 'A')
                continue

            if (i === 0 
                || i === data.length - 1
                || j === 0
                || j === data[i].length - 1
            )
                continue

            let p1 = [data[i - 1][j - 1], data[i + 1][j  + 1]].sort().join('')
            let p2 = [data[i - 1][j + 1], data[i + 1][j  - 1]].sort().join('')

            if (p1 === 'MS' && p2 === 'MS')
                counter++
        }
    }

    return counter
}

print = (data, l1, l2, l3, l4, label) => {
    // var p = new Array(data.length).fill('.').map(x => new Array(data[0].length).fill('.'))
    
    // p[l1[0]][l1[1]] = data[l1[0]][l1[1]]
    // p[l2[0]][l2[1]] = data[l2[0]][l2[1]]
    // p[l3[0]][l3[1]] = data[l3[0]][l3[1]]
    // p[l4[0]][l4[1]] = data[l4[0]][l4[1]]

    // console.log('XMAS', label, l1[0], l1[1])
    // console.log(
    //     p.map(x => x.join('')).join('\r\n')
    // )
}

parse = (data) => {
    return data.split('\n')
               .map(x => x.split(''));
}

main = async () => {
    await fs.readFile('./04.txt', 'utf8', async (err, data) => {
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