const fs = require('fs');

p1 = (data) => {
    return data.filter(x => x[1] === '17,61')
               .map(x => `${x[0]} (${x[1]})`)[0]
};

p2 = (data) => {
    let requestedOutputs = ['output 0', 'output 1', 'output 2']
    return requestedOutputs.map(x => data[x][0])
                           .reduce((p, c) => p * c, 1)
}

processInstructions = (data) => {
    let output = {
        logs: [],
        outputs: {}
    }

    for (let i = 0; i < data.instructions.length; i++) {
        let instruction = data.instructions[i]
        data.bots[instruction[1]].values.push(instruction[0])

        processBotLogic(data.bots, instruction[1], output)
    }

    return output
}

processBotLogic = (bots, botName, output) => {
    let bot = bots[botName];

    if (!bot.shouldProcess())
        return  

    output.logs.push([bot.name, bot.values.sort((a, b) => a - b).toString()])

    let min = bot.min()
    let max = bot.max()

    bots[botName].values = []

    if (Object.keys(bots).contains(min[0])) {
        bots[min[0]]?.values.push(min[1])
        processBotLogic(bots, min[0], output)
    } else if (min[0].startsWith('output')) {
        if (!Object.keys(output.outputs).contains(min[0]))
            output.outputs[min[0]] = []

        output.outputs[min[0]].push(min[1])
    }

    if (Object.keys(bots).contains(max[0])) {
        bots[max[0]]?.values.push(max[1])
        processBotLogic(bots, max[0], output)
    } else if (max[0].startsWith('output')) {
        if (!Object.keys(output.outputs).contains(max[0]))
            output.outputs[max[0]] = []

        output.outputs[max[0]].push(max[1])
    }
}

parse = (data) => {
    data = data.split('\r\n');

    const botRegex = /(bot \d+) gives low to ((?:bot|output)\s\d+) and high to ((?:bot|output)\s\d+)/;
    let bots = data.filter(x => x.startsWith('bot'))
                   .map(x => {
                        let match = botRegex.exec(x)

                        return {
                            name: match[1],
                            values: [],
                            shouldProcess: function() { return this.values.length === 2 },
                            min: function() {
                                if (this.values.length !== 2)
                                    return;
                                return [match[2], Math.min(...this.values)]
                            },
                            max: function() {
                                if (this.values.length !== 2)
                                    return;
                                return [match[3], Math.max(...this.values)]
                            }
                        }
                   })
                   .toDictionary(x => x.name, x => x);

    let instructionsRegex = /value (\d+) goes to ((?:bot|output)\s\d+)/;
    let instructions = data.filter(x => x.startsWith('value'))
                           .map(x => {
                                let match = instructionsRegex.exec(x)
                                return [parseInt(match[1]), match[2]]
                           })

    return {
        bots: bots,
        instructions: instructions
    };
}

main = async () => {
    if (!Array.prototype.toDictionary) {
        Array.prototype.toDictionary = function(key, value) {
            let dict = {}
            this.forEach(x => dict[key(x)] = value(x))
            return dict;
        }
    }
    if (!Array.prototype.contains) {
        Array.prototype.contains = function(value) {
            return this.indexOf(value) !== -1
        }
    }

    await fs.readFile('./10.txt', 'utf8', async (err, data) => {
        data = parse(data)
        const start = performance.now();
        let {logs, outputs} = processInstructions(data)
        const end = performance.now();

        console.log(`processing instructions took ${Math.round((end - start) * 10000) / 10000} ms\r\n`)

        console.log('part 1:', measure(() => p1(logs)));
        console.log('part 2:', measure(() => p2(outputs)));
    });
}

measure = (fn) => {
    const start = performance.now();
    let result = fn();
    const end = performance.now();

    return `${result} (${Math.round((end - start) * 10000) / 10000} ms)`;
}

main();