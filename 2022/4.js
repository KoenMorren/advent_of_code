const fs = require('fs');

main = () => {
    fs.readFile('./4_input.txt', 'utf8', (err, data) => {
        data = data.split('\n')
                    .map(splitter(','))
                    .map(x => x.map(splitter('-')))
                    .map(x => x.map(y => y.map(z => parseInt(z))))

        // Part 1
        console.log('Part 1', 
            data.filter(contains)
                .length
        )
        
        // Part 2
        console.log('Part 2',
            data.filter(overlap)
                .length
        )
    });
};

splitter = (separator) => {
    return (x) => {
        return x.split(separator);
    };
}

contains = (x) => {
    var e1 = x[0]
    var e2 = x[1]

    return (e1[0] <= e2[0] && e1[1] >= e2[1])
           || (e2[0] <= e1[0] && e2[1] >= e1[1])
}

overlap = (x) => {
    var e1 = x[0]
    var e2 = x[1]

    return (e2[0] <= e1[1] && e2[1] >= e1[0])
           || (e1[0] <= e2[1]  && e1[1] >= e2[0])
}

main();