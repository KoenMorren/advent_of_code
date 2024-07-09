const fs = require('fs');

const MFCSAM = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1
}

p1 = (data) => {
    let match = -1;

    for (let i = 0; i < data.length; i++) {
        if (checkMatch(data[i])) {
            match = i + 1
            break;
        }
    }

    return match
}

p2 = (data) => {
    let match = -1;

    for (let i = 0; i < data.length; i++) {
        if (checkMatchWithRanges(data[i])) {
            match = i + 1;
            break;
        }
    }

    return match
}

parseData = (data) => {
    const regex = /(Sue \d*\:\s)/;
    const base = {
        children: 0,
        cats: 0,
        samoyeds: 0,
        pomeranians: 0,
        akitas: 0,
        vizslas: 0,
        goldfish: 0,
        trees: 0,
        cars: 0,
        perfumes: 0
    }

    return data.split('\r\n')
               .map(x => JSON.parse(`{"${x.replace(regex, '').replace(/\:/g, '":').replace(/\,\s/g, ', "')}}`))
}

checkMatch = (data) => {
    let keys = Object.keys(data);

    for(let i = 0; i < keys.length; i++) {
        if (data[keys[i]] !== MFCSAM[keys[i]])
            return false;
    }

    return true;
}

const operations = {
    children: (x, y) => x === y,
    cats: (x, y) => x < y,
    samoyeds: (x, y) => x === y,
    pomeranians: (x, y) => x > y,
    akitas: (x, y) => x === y,
    vizslas: (x, y) => x === y,
    goldfish: (x, y) => x > y,
    trees: (x, y) => x < y,
    cars: (x, y) => x === y,
    perfumes: (x, y) => x === y
}

checkMatchWithRanges = (data) => {
    let keys = Object.keys(data);

    for(let i = 0; i < keys.length; i++) {
        let key = keys[i]
        if (!operations[key](MFCSAM[keys[i]], data[keys[i]]))
            return false;
    }

    return true;
}

main = async () => {
    if (!Array.prototype.last) {
        Array.prototype.last = function() {
            return this[this.length - 1]
        }
    }

    await fs.readFile('./16.txt', 'utf8', async (err, data) => {
        data = parseData(data)

        console.log('part 1:', p1(structuredClone(data)));
        console.log('part 2:', p2(structuredClone(data)));
    });
}

main();