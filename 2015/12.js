const fs = require('fs');

p1 = (data) => {
    const regex = /-?[0-9]\d*/g;

    return [...data.matchAll(regex)]
            .map(x => parseInt(x[0]))
            .reduce((p, c) => p + c, 0)
}

p2 = (data) => {
    let obj = JSON.parse(data);

    return reduceObject(obj)
}

reduceObject = (object) => {
    if (typeof(object) === 'string') return 0;
    if (typeof(object) === 'number') return object;

    let total = 0;

    if (Array.isArray(object)) {
        for (let i = 0; i < object.length; i++) {
            total += reduceObject(object[i])
        }
    }
    else {
        if (Object.values(object).filter(x => typeof(x) === 'string' && x.toLowerCase() === 'red').length >= 1)
            return 0;
        
        let keys = Object.keys(object);
        for (let i = 0; i < keys.length; i++) {
            total += reduceObject(object[keys[i]])
        }
    }

    return total;    
}

main = async () => {
    await fs.readFile('./12.txt', 'utf8', async (err, data) => {
        console.log('part 1:', measure(() => p1(structuredClone(data))))
        console.log('part 2:', measure(() => p2(structuredClone(data))))
    });
}

measure = (fn) => {
    const start = performance.now();
    let result = fn();
    const end = performance.now();

    return `${result} (${Math.round((end - start) * 10000) / 10000} ms)`;
}

main();