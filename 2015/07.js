const fs = require('fs');

let operations = {
    'AND': (x, y) => x & y,
    'OR': (x, y) => x | y,
    'NOT': (x) => parseInt(x.toString(2).padStart(16, '0').split('').map(x => x === '1' ? '0' : '1').join(''), 2),
    'LSHIFT': (x, y) => parseInt(`${x.toString(2).padStart(16, '0').substring(y)}${x.toString(2).padStart(16, '0').substring(0, y)}`, 2),
    'RSHIFT': (x, y) => parseInt(`${x.toString(2).padStart(16, '0').substring(x.toString(2).padStart(16, '0').length - y)}${x.toString(2).padStart(16, '0').substring(0, x.toString(2).padStart(16, '0').length - y)}`, 2),
}

p1 = (data) => {
    let register = {};

    data.forEach(x => {
        let operation = x[0].split(' ');
        if (operation.length === 1) {
            let a = parseInt(operation[0]) || register[operation[0]] || 0;
            register[x[1]] = a;
        }

        if (operation.length === 2) {
            let a = parseInt(operation[0]) || register[operation[1]] || 0;
            register[x[1]] = operations[operation[0]](a)
        }

        if (operation.length === 3) {
            let a = parseInt(operation[0]) || register[operation[0]] || 0;
            let b = parseInt(operation[2]) || register[operation[2]] || 0;

            register[x[1]] = operations[operation[1]](a, b)
        }
    })


    console.log('part 1:', JSON.stringify(register, null, 2), register['a'])

    return register['a'];
}

p2 = (data) => {
    return null;
}

parse = (input) => {
    return input.split('\r\n')
                .map(x => x.split(' -> '));
}

main = async () => {
    if (!Array.prototype.last){
        Array.prototype.last = function(){
            return this[this.length - 1];
        };
    };
    
    await fs.readFile('./07.txt', 'utf8', async (err, data) => {
        console.log('part 1:', p1(structuredClone(data)));
        console.log('part 2:', p2(structuredClone(data)));
    });
}

main();