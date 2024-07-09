const fs = require('fs');

const operations = {
    'hlf': (registers, param1, param2, i) => { registers[param1] /= 2; return i + 1 },
    'tpl': (registers, param1, param2, i) => { registers[param1] *= 3; return i + 1 },
    'inc': (registers, param1, param2, i) => { registers[param1]++; return i + 1 },
    'jmp': (registers, param1, param2, i) => { return i + parseInt(param1) },
    'jie': (registers, param1, param2, i) => { return registers[param1] % 2 === 0 ? i + parseInt(param2) : i + 1 },
    'jio': (registers, param1, param2, i) => { return registers[param1] === 1 ? i + parseInt(param2) : i + 1 },
}

p1 = (data) => {
    let registers = {
        'a': 0,
        'b': 0
    }

    executeInstructions(registers, data)

    return registers['b']
}

p2 = (data) => {
    let registers = {
        'a': 1,
        'b': 0
    }

    executeInstructions(registers, data)

    return registers['b']
}

parseData = (data) => {
    return data.split('\r\n')
        .map(x => x.replace(',', '').split(' '))
}

executeInstructions = (registers, instructions) => {
    let index = 0;
        
    while (index < instructions.length) {
        let instruction = instructions[index]
        index = operations[instruction[0]](registers, instruction[1], instruction[2], index)
    }
}

main = async () => {
    if (!Array.prototype.last) {
        Array.prototype.last = function() {
            return this[this.length - 1]
        }
    }

    await fs.readFile('./23.txt', 'utf8', async (err, data) => {
        data = parseData(data)

        console.log('part 1:', p1(structuredClone(data)));
        console.log('part 2:', p2(structuredClone(data)));
    });
}

main();