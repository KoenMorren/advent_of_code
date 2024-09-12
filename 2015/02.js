const fs = require('fs');

p1 = (presents) => {
    var totalArea = 0;

    presents.forEach(x => {
        var [l, w, h] = x.split('x');
        
        var area = [
            l*w,
            w*h,
            h*l
        ]
        totalArea += area.reduce((prev, curr) => {
            return prev +  2 * curr;
        }, 0) + Math.min(...area)
    });

    return totalArea
}

p2 = (presents) => {
    var total = 0;

    presents.forEach(x => {
        var dimensions = x.split('x').map(x => parseInt(x)).sort((a, b) => a - b)

        total += dimensions[0] * 2 + dimensions[1] * 2 + (dimensions[0] * dimensions[1] * dimensions[2]);
    });

    return total
}

main = () => {
    fs.readFile('./02.txt', 'utf8', (err, data) => {
        var presents = structuredClone(data.split(';'));

        console.log('part 1:', measure(() => p1(presents)))
        console.log('part 2:', measure(() => p2(presents)))
    });
};

measure = (fn) => {
    const start = performance.now();
    let result = fn();
    const end = performance.now();

    return `${result} (${Math.round((end - start) * 10000) / 10000} ms)`;
}

main();
