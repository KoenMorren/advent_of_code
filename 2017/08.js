const fs = require('fs');

const operations = {
    '<': (a, b) => a < b,
    '<=': (a, b) => a <= b,
    '>': (a, b) => a > b,
    '>=': (a, b) => a >= b,
    '==': (a, b) => a == b,
    '!=': (a, b) => a != b,
    'inc': (a, b) => a + b,
    'dec': (a, b) => a - b,
}

p1 = (data) => {
    const registers = {}

    data.forEach(instruction => {
        if (!(instruction.condition.register in registers))
            registers[instruction.condition.register] = 0

        if (operations[instruction.condition.operation](registers[instruction.condition.register], instruction.condition.amount)) {
            if (!(instruction.target in registers))
                registers[instruction.target] = 0

            registers[instruction.target] = operations[instruction.operation](registers[instruction.target], instruction.amount)
        }
    });

    return Object.values(registers).sort((a, b) => b - a)[0]
};

p2 = (data) => {
    let maxValue = 0
    const registers = {}

    data.forEach(instruction => {
        if (!(instruction.condition.register in registers))
            registers[instruction.condition.register] = 0

        if (operations[instruction.condition.operation](registers[instruction.condition.register], instruction.condition.amount)) {
            if (!(instruction.target in registers))
                registers[instruction.target] = 0

            registers[instruction.target] = operations[instruction.operation](registers[instruction.target], instruction.amount)

            if (registers[instruction.target] > maxValue)
                maxValue = registers[instruction.target]
        }
    });

    return maxValue
}

parse = (data) => {
    return data.split(/[\r\n]+/)
               .map(x => x.split(' '))
               .map(x => {
                    return {
                        target: x[0],
                        operation: x[1],
                        amount: +x[2],
                        condition: {
                            register: x[4],
                            operation: x[5],
                            amount: +x[6]
                        }
                    }
               })
}

main = async () => {
    await fs.readFile('./08.txt', 'utf8', async (err, data) => {
        data = parse(data)

        console.log('part 1:', measure(() => p1(structuredClone(data))));
        console.log('part 2:', measure(() => p2(structuredClone(data))));
    });
}

measure = (fn) => {
    const start = performance.now();
    let result = fn();
    const end = performance.now();

    return `${result} (${Math.round((end - start) * 10000) / 10000} ms)`;
}

main();