const fs = require('fs');

main = () => {
    fs.readFile('./5__input.txt', 'utf8', (err, data) => {
        data = data.split('\n')

        var stacks = data.slice(0, 8)
        var commands = data.slice(10)

        stacks = transpose(stacks.map(x => x.split('').reduce(chunk(4), []))
                       .map(x => x.map(y => y[1]))
                       .reverse()
                 ).map(removeEmpties)
        
        commands.map(interpret)
                .forEach(execute(stacks))
    });
};

chunk = (n) => {
    return (prev, curr, i) => {
        if (i % n === 0) prev.push([])

        prev[prev.length - 1].push(curr)
        return prev
    }
}

removeEmpties = (x) => {
    return x.slice(0, x.indexOf(' '))
}

interpret = (x) => {
    return x.match(/[0-9]+/g).map(y => parseInt(y))
}

execute = (stacks) => {
    return (x) => {
        console.log(x, stacks)

        for(var i = 0; i < x[0]; i++) {
            stacks[x[2] - 1].push(stacks[x[1] - 1].pop())
        }

        console.log(stacks)
    }
}

transpose = (arr) => {
    return arr[0].map((_, colIndex) => arr.map(row => row[colIndex]));
}

main();