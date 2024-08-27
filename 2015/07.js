const fs = require('fs');

uint16 = (n) => n & 0xFFFF;

let operations = {
    'AND': (x, y) => uint16(uint16(x) & uint16(y)),
    'OR': (x, y) => uint16(x | y),
    'NOT': (x) => uint16(~x),
    'NOT_1': (x) => parseInt(x.toString(2).padStart(16, '0').split('').map(x => x === '1' ? '0' : '1').join(''), 2),
    'LSHIFT': (x, y) => uint16(x) << y,
    'RSHIFT': (x, y) => uint16(x) >> y,
    'LSHIFT_1': (x, y) => parseInt(`${x.toString(2).padStart(16, '0').substring(y)}${x.toString(2).padStart(16, '0').substring(0, y)}`, 2),
    'RSHIFT_1': (x, y) => parseInt(`${x.toString(2).padStart(16, '0').substring(x.toString(2).padStart(16, '0').length - y)}${x.toString(2).padStart(16, '0').substring(0, x.toString(2).padStart(16, '0').length - y)}`, 2),
}

p1 = (data, line) => {
    let dict = Object.fromEntries(data.map(x => [x[1], x[0]]))

    return solve(line, dict);
}

p2 = (data, line) => {
    let dict = Object.fromEntries(data.map(x => [x[1], x[0]]))

    // override
    dict['b'] = 956;
    
    return solve(line, dict);
}

parse = (input) => {
    return input.split('\r\n')
                .map(x => x.split(' -> '));
}

solve = (line, dict) => {
    if (!isNaN(line))
        return parseInt(line);

    if (!isNaN(dict[line]))
        return parseInt(dict[line]);

    let operation = dict[line].split(' ');
    let result = null;

    switch (operation.length) {
        case 1:
            result = solve(operation[0], dict);
            break;
        case 2:
            operation[1] = solve(operation[1], dict)
            result = executeInstruction(operation)
            break;
        case 3:
            operation[0] = solve(operation[0], dict)
            operation[2] = solve(operation[2], dict)
            result = executeInstruction(operation)
            break;
    }

    dict[line] = result

    return result;
}

executeInstruction = (instruction) => {
    switch(instruction.length) {
        case 2:
            return operations[instruction[0]](instruction[1])
        case 3:
            return operations[instruction[1]](instruction[0], instruction[2])
    }
}

main = async () => {
    if (!Array.prototype.last){
        Array.prototype.last = function(){
            return this[this.length - 1];
        };
    };
    
    await fs.readFile('./07.txt', 'utf8', async (err, data) => {
        data = parse(data);

        console.log('part 1:', p1(structuredClone(data), 'a'));
        console.log('part 2:', p2(structuredClone(data), 'a'));
    });
}

main();