const fs = require('fs');

p1 = (data) => {
    return data.filter(x => isValidTriangle(...x))
               .length;
};

p2 = (data) => {
    data = data.reduce((p, c, i, arr) => {
        if (i !== 0 && (i + 1) % 3 === 0) {
            p.push([arr[i - 2][0], arr[i - 1][0], arr[i][0]])
            p.push([arr[i - 2][1], arr[i - 1][1], arr[i][1]])
            p.push([arr[i - 2][2], arr[i - 1][2], arr[i][2]])
        }
        
        return p
    }, [])

    return data.filter(x => isValidTriangle(...x))
               .length
}

isValidTriangle = (a, b, c) => {
    return a + b > c
           && b + c > a
           && c + a > b;
}

parse = (data) => {
    return data
            .split('\r\n')
            .map(x => x.trim()
                       .replaceAll(/ +/g, ' ')
                       .split(' ')
                       .map(y => parseInt(y))
            );
}

main = async () => {
    await fs.readFile('./03.txt', 'utf8', async (err, data) => {
        data = parse(data)

        console.log('part 1:', p1(structuredClone(data)));
        console.log('part 2:', p2(structuredClone(data)));
    });
}

main();