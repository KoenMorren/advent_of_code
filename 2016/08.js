const fs = require('fs');

const operations = {
    'rect': (screen, x, y) => {
        for (let i = 0; i < x; i++) {
            for (let j = 0; j < y; j++) {
                screen[j][i] = '#'
            }
        }

        return screen
    },
    'rotate_row': (screen, i, amount) => {
        for (let n = 0; n < amount; n++) {
            let t = screen[i].pop()
            screen[i] = [t, ...screen[i]]
        }

        return screen
    },
    'rotate_column': (screen, i, amount) => {
        for (let n = 0; n < amount; n++) {
            let prev = screen[screen.length - 1][i]
            for (let r = screen.length - 2; r >= 0; r--) {
                screen[r + 1][i] = screen[r][i]
            }
            screen[0][i] = prev
        }

        return screen
    },
}

p1 = (data) => {
    return data
        .flatMap(x => x)        // new array
        .filter(x => x === '#') // new array
        .length
};

p2 = (data) => {
    return `\r\n${format(data)}`
}

makeGrid = (rows, cols) => {
    return new Array(rows).fill(0).map(_ => new Array(cols).fill('.'))
}

format = (screen) => {
    return screen.map(a => a.join(' ').replaceAll('.', ' ')).join('\r\n')
}

parse = (data) => {
    const regex = /(rect|rotate\s(?:column|row))\s{1}(?:(?:x=|y=)?(\d+))(?:x|\s{1})(?:(?:by\s)?(\d+))/

    return data
        .split('\r\n')
        .map(x => regex.exec(x))
        .map(x => [x[1].replace(' ', '_'), parseInt(x[2]), parseInt(x[3])]);
}

main = async () => {
    const dims = [6, 50]

    await fs.readFile('./08.txt', 'utf8', async (err, data) => {
        data = parse(data)
        data = data.reduce((p, c) => operations[c[0]](p, c[1], c[2]), makeGrid(...dims))

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