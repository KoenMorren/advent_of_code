const fs = require('fs');

p1 = (data) => {
    let operations = [
        (a, b) => a + b,
        (a, b) => a * b
    ]

    return data.map(x => isValidResult(operations, x.result, x.inputs[0], x.inputs.slice(1)) ? x.result : 0)
               .reduce((p, c) => p + c, 0)
};

p2 = (data) => {
    let operations = [
        (a, b) => a + b,
        (a, b) => a * b,
        (a, b) => parseInt(`${a}${b}`)
    ]

    return data.map(x => isValidResult(operations, x.result, x.inputs[0], x.inputs.slice(1)) ? x.result : 0)
               .reduce((p, c) => p + c, 0)
}

isValidResult = (operations, result, tempResult, remainingInputs) => {
    if (remainingInputs.length === 0) {
        if (result === tempResult)
            return true;
        return false
    } 

    return operations.map(x => isValidResult(operations, result, x(tempResult, remainingInputs[0]), remainingInputs.slice(1)))
                     .filter(x => !!x)
                     .length >= 1
}

parse = (data) => {
    return data.split('\n')
               .map(x => {
                    let t = x.split(':')

                    return {
                        result: parseInt(t[0]),
                        inputs: t[1].trim().split(' ').map(y => parseInt(y))
                    }
                });
}

main = async () => {
    await fs.readFile('./07.txt', 'utf8', async (err, data) => {
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