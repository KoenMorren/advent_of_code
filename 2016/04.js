const fs = require('fs');

p1 = (data) => {
    return data.filter(x => isValidRoom(x))
               .reduce((p, c) => p + c[1], 0)
};

p2 = (data) => {
    return data.map(x => [decrypt(x), x[1], x[2]])
               .filter(x => x[0].equals('northpole object storage'))
}

isValidRoom = (room) => {
    var dict = {}

    room[0]
        .join('')
        .split('')
        .forEach(x => dict[x] = (dict[x] || 0) + 1)

    return Object.keys(dict)
          .sort((a, b) => dict[a] === dict[b] ? a.localeCompare(b) : dict[b] - dict[a])
          .slice(0, 5)
          .join('')
          .equals(room[2])
}

decrypt = (room) => {
    return room[0]
        .map(y => y.split('')
            .map(x => shift(x, (room[1] % 26)))
            .join('')
        )
        .join(' ')
}

shift = (char, offset) => {
    let t = char.charCodeAt(0) - 97 + offset

    if (t >= 26)
        return String.fromCharCode(t - 26 + 97)
    return String.fromCharCode(t + 97)
}

parse = (data) => {
    return data
        .split('\r\n')
        .map(x =>
            x.replaceAll('[', ';')
                .replaceAll(']', '')
                .split(';')
        )
        .map(x => 
            [...x[0].split('-').reduce((p, c, i, arr) => {
                if (i === arr.length - 1)
                    p[1] = parseInt(c)
                else
                    p[0].push(c)

                return p
            }, [[], 0]), x[1]]
        )
}

main = async () => {
    if (!String.prototype.equals) {
        String.prototype.equals = function(that) {
            return this.valueOf() === that
        }
    }

    await fs.readFile('./04.txt', 'utf8', async (err, data) => {
        data = parse(data)

        console.log('part 1:', p1(structuredClone(data)));
        console.log('part 2:', p2(structuredClone(data)));
    });
}

main();