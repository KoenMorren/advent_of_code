const fs = require('fs');

p1 = (data) => {
    const up = data.split('').filter(x => x == '(').length;
    const down = data.length - up;

    return up - down;
}

p2 = (data) => {
    const mvmts = data.split('');
    let start = 0;
    
    for (var i = 0; i < mvmts.length; i++) {
        if (mvmts[i] === '(') 
            start += 1;
        else 
            start -= 1;

        if (start < 0) break;
    }

    return i + 1;
}

main = async () => {
    await fs.readFile('./2015_1.txt', 'utf8', (err, data) => {
        console.log('Part 1:', p1(data));
        console.log('Part 2:', p2(data));
    })
}

main();