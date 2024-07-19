const fs = require('fs');

const instructions = {
    '^': (x, y) => [x, y-1],
    'v': (x, y) => [x, y+1],
    '<': (x, y) => [x-1, y],
    '>': (x, y) => [x+1, y],
}

p1 = (data) => {
    let x = 0
    let y = 0

    let houses = {
        '0;0': 1
    }

    data.forEach(i => {
        [x, y] = instructions[i](x, y)
        let coords = `${x};${y}`
        houses[coords] = (houses[coords] || 0) + 1
    });

    return Object.keys(houses).length;
}

p2 = (data) => {
    let santa = [0, 0]
    let robo = [0, 0]

    let houses = {
        '0;0': 2
    }

    for (let i = 0; i < data.length; i++) {
        let start = i % 2 == 0 ? santa : robo;

        [start[0], start[1]] = instructions[data[i]](start[0], start[1])
        let coords = `${start[0]};${start[1]}`
        houses[coords] = (houses[coords] || 0) + 1
    };

    return Object.keys(houses).length;
}

main = async () => {
    fs.readFile('./03.txt', 'utf-8', (err, data) => {
        data = data.split('')

        console.log('part 1:', p1(structuredClone(data)))
        console.log('part 1:', p2(structuredClone(data)))
    })
}

main()