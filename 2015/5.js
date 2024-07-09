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
    await fs.readFile('./5.txt', 'utf8', async (err, data) => {
        data = data.split('\r\n');

        console.log('Part 1:', p1(data));
        console.log('Part 2:', p2(data));
    })
}

main();