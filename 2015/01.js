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
    await fs.readFile('./01.txt', 'utf8', (err, data) => {
        console.log('part 1:', measure(() => p1(data)));
        console.log('part 2:', measure(() => p2(data)));
    })
}

measure = (fn) => {
    const start = performance.now();
    let result = fn();
    const end = performance.now();

    return `${result} (${Math.round((end - start) * 10000) / 10000} ms)`;
}

main();