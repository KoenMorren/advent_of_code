const fs = require('fs');

p1 = (data) => {
    var vowels = /[aeiou]/g;
    var doubles = /(.)\1/g;
    var exclude = /(ab|cd|pq|xy)/g;

    return data.filter(x => {
        return (x.match(vowels) || []).length >= 3
                && (x.match(doubles) || []).length >= 1
                && (x.match(exclude) || []).length == 0;
    }).length;
}

p2 = (data) => {
    let doubles = /(..).*\1/g
    let repeat = /(.).\1/g

    return data.filter(x => !!x.match(doubles) && !!x.match(repeat))
               .length
}

main = async () => {
    await fs.readFile('./05.txt', 'utf8', async (err, data) => {
        data = data.split('\r\n');

        console.log('part 1:', measure(() => p1(data)))
        console.log('part 2:', measure(() => p2(data)))
    })
}

measure = (fn) => {
    const start = performance.now();
    let result = fn();
    const end = performance.now();

    return `${result} (${Math.round((end - start) * 10000) / 10000} ms)`;
}

main();