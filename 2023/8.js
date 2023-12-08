const fs = require('fs');

p1 = async () => {
    await fs.readFile('./8_input.txt', 'utf8', (err, data) => {
        data = data.split('\n');

        const instructions = parseData(data);

        let position = 'AAA';
        let step = 0;
        while (position !== 'ZZZ') {
            let direction = instructions.instructions[step % instructions.instructions.length]
            position = instructions.nodes[position][direction]

            step++;
        }

        console.log("Part 1", step);
    });
};

p2 = async () => {
    await fs.readFile('./8_input.txt', 'utf8', (err, data) => {
        data = data.split('\n');

        const instructions = parseData(data);

        // TODO: implement graph theory

        let positions = Object.keys(instructions.nodes).filter(x => x.indexOf('A') === 2)

        let step = 0;
        while (positions.filter(x => x.indexOf('Z') === 2).length !== positions.length) {

            let direction = instructions.instructions[step % instructions.instructions.length]
            for(let i = 0; i < positions.length; i++) {
                positions[i] = instructions.nodes[positions[i]][direction]
            }
            
            step++;
        }

        
        console.log("Part 2", step);
    });
};

parseData = (data) => {
    let nodes = {}

    for(let i = 2; i < data.length; i++) {
        let line = data[i].split(' = ')
        nodes[line[0]] = {
            'L': line[1].split(', ')[0].replace('(', ''),
            'R': line[1].split(', ')[1].replace(')', '')
        }
    }

    return {
        instructions: data[0].split(''),
        nodes: nodes
    }
}

main = async () => {
    await p1();
    await p2();
}

main();