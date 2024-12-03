const fs = require('fs');

p1 = (data) => {
    let registers = {
        'a': 7,
        'b': 0,
        'c': 0,
        'd': 0,
    }

    return processInstructions(registers, data)['a']
};

p2 = (data) => {
    let registers = {
        'a': 12,
        'b': 0,
        'c': 0,
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
            case 'tgl':
                let v = getValue(registers, instruction[1]) 
                
                if (i + v < 0 || i + v > instructions.length - 1)
                    continue
                
                let instr = instructions[i + v]

                if (instr.length === 2) {
                    if (instr[0] === 'inc')
                        instr[0] = 'dec'
                    else 
                        instr[0] = 'inc'
                }
                if (instr.length === 3) {
                    if (instr[0] === 'jnz')
                        instr[0] = 'cpy'
                    else 
                        instr[0] = 'jnz'
                }
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
    const regex = /(cpy|inc|dec|jnz|tgl)\s([abcd]|-?\d+)(?:\s([abcd]|-?\d+))?/
    console.log(data.split('\n'))
    return data
        .split('\n')
        .map(x => regex.exec(x))
        .map(x => {
            let a = [x[1], x[2]]
            if (x[3]) a.push(x[3])
            return a
        })
}

main = async () => {
    await fs.readFile('./23.txt', 'utf8', async (err, data) => {
        data = parse(data)

        console.log(data)

        console.log('part 1:', measure(() => p1(structuredClone(data))));
        console.log('part 2:', measure(() => p2(structuredClone(data))), 'horribly inefficient (= 95*73 + 12!)');
    });
}

measure = (fn) => {
    const start = performance.now();
    let result = fn();
    const end = performance.now();

    return `${result} (${Math.round((end - start) * 10000) / 10000} ms)`;
}

main();