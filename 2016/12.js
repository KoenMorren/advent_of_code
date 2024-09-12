const fs = require('fs');

p1 = (data) => {
    let registers = {
        'a': 0,
        'b': 0,
        'c': 0,
        'd': 0,
    }

    return processInstructions(registers, data)['a']
};

p2 = (data) => {
    let registers = {
        'a': 0,
        'b': 0,
        'c': 1,
        'd': 0,
    }

    return processInstructions(registers, data)['a']
}

processInstructions = (registers, instructions) => {
    for (let i = 0; i < instructions.length; i++) {
        let instruction = instructions[i]

        switch (instruction[0]) {
            case 'cpy':
                registers[instruction[2]] = getValue(registers, instruction[1])
                break;
            case 'inc':
                registers[instruction[1]]++
                break;
            case 'dec':
                registers[instruction[1]]--
                break;
            case 'jnz':
                if (getValue(registers, instruction[1]) !== 0)
                    i += parseInt(getValue(registers, instruction[2])) - 1
                break;
        }
    }

    return registers
}

getValue = (registers, x) => {
    if (isNaN(parseInt(x)))
        return registers[x]
    return parseInt(x)
}

parse = (data) => {
    const regex = /(cpy|inc|dec|jnz)\s([abcd]|\d+)(?:\s([abcd]|-?\d+))?/
    return data
        .split('\r\n')
        .map(x => regex.exec(x))
        .map(x => [x[1], x[2], x[3]])
}

main = async () => {
    await fs.readFile('./12.txt', 'utf8', async (err, data) => {
        data = parse(data)

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