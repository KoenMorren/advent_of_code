const fs = require('fs');

p1 = (data) => {
    let regex = /(\\x[a-zA-Z0-9]{2}|\\\\|\\\")/g

    data = data.map(x => [x, x.length, x.replaceAll(regex, '1'), x.replaceAll(regex, '1').length - 2])
                .reduce((p, c) => [p[0] + c[1], p[1] + c[3]], [0, 0])

    return data[0] - data[1]
}

p2 = (data) => {
    let regex = /(\"|\\)/g

    data = data.map(x => [x, x.length, x.replace(regex, replacer), x.replaceAll(regex, replacer).length + 2])
                .reduce((p, c) => [p[0] + c[1], p[1] + c[3]], [0, 0])
    
    return data[1] - data[0]
}

parse = (input) => {
    return input.split('\r\n')
}

replacer = (match, p1, offset, string) => {
    return `\\${match}`
}

main = async () => {
    if (!Array.prototype.last){
        Array.prototype.last = function(){
            return this[this.length - 1];
        };
    };

    await fs.readFile('./08.txt', 'utf8', async (err, data) => {
        data = parse(data)

        console.log('part 1:', p1(structuredClone(data)));
        console.log('part 2:', p2(structuredClone(data)));
    });
}

main();