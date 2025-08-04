const fs = require('fs');

p1 = (data) => {
    return data.filter(isValid)
               .length

    function isValid(passphrase) {
        for (let i = 0; i < passphrase.length; i++) {
            if (passphrase.findLastIndex(e => e == passphrase[i]) != i)
                return false;
        }

        return true;
    }
};

p2 = (data) => {
    return data.filter(isValid)
               .length

    function isValid(passphrase) {
        for (let i = 0; i < passphrase.length; i++) {
            if (passphrase.findLastIndex(e => isAnagram(passphrase[i], e)) != i)
                return false;
        }

        return true;
    }

    function isAnagram(a, b) {
        if (a.length !== b.length)
            return false

        var as = a.split('').sort().join('')
        var bs = b.split('').sort().join('')

        return as === bs
    }
}

parse = (data) => {
    return data.split(/[\r\n]+/)
               .map(x => x.split(' '))
}

main = async () => {
    await fs.readFile('./04.txt', 'utf8', async (err, data) => {
        data = parse(data)

        console.log('part 1:', measure(() => p1(structuredClone(data))));
        console.log('part 2:', measure(() => p2(structuredClone(data))));
    });
}

measure = (fn) => {
    const start = performance.now();
    let result = fn();
    const end = performance.now();

    return `${result} (${Math.round((end - start) * 10000) / 10000} ms)`;
}

main();