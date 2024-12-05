const fs = require('fs');

p1 = (data) => {
    return data.updates
        .map(u => u.map((x, i, arr) => isValid(data.rules, i, arr))
                   .reduce((p, c) => p && c, true))
        .map((u, i) => u ? data.updates[i] : null)
        .filter(x => x != null)
        .map(x => parseInt(x[Math.floor(x.length / 2)]))
        .reduce((p, c) => p + c, 0)
};

p2 = (data) => {
    return data.updates
        .map(u => u.map((x, i, arr) => isValid(data.rules, i, arr))
                   .reduce((p, c) => p && c, true))
        .map((u, i) => !u ? data.updates[i] : null)
        .filter(x => x != null)
        .map(x => correct(data.rules, x))
        .map(x => parseInt(x[Math.floor(x.length / 2)]))
        .reduce((p, c) => p + c, 0)
}

isValid = (rules, index, arr) => {
    let r = rules[arr[index]]
    let beforeValid = true, afterValid = true

    if (index !== 0) {
        let leading = arr.slice(0, index)
        beforeValid = leading.map(x => r.before.indexOf(x) === -1)
                             .reduce((p, c) => p && c, true)
    }

    if (index !== arr.length - 1) {
        let remainder = arr.slice(index + 1)
        afterValid = remainder.map(x => r.after.indexOf(x) === -1)
                              .reduce((p, c) => p && c, true)
    }

    return beforeValid && afterValid
}

correct = (rules, update) => {
    let corrected = []

    for (let i = 0; i < update.length; i++) {
        let itemsToPlace = update.filter(x => corrected.indexOf(x) === -1)
                                 .reduce((p, c) => { p[c] = []; return p }, {});

        Object.keys(itemsToPlace)
              .forEach(k => {
                itemsToPlace[k] = Object.keys(itemsToPlace).filter(x => x !== k)
                                              .filter(x => rules[k].after.indexOf(x) !== -1)
              })

        corrected.push(Object.keys(itemsToPlace).filter(x => itemsToPlace[x].length === 0)[0])
    }

    return corrected
}

parse = (data) => {
    let obj = data.split('\n')
    let i = obj.indexOf('')
    let rules = obj.slice(0, i).reduce((p, c) => {
        let rule = c.split('|')
        p[rule[0]] = p[rule[0]] || {before: [], after: []}
        p[rule[0]].before.push(rule[1])

        p[rule[1]] = p[rule[1]] || {before: [], after: []}
        p[rule[1]].after.push(rule[0])
        return p
    }, {})

    let updates = obj.slice(i + 1).map(x => x.split(','))

    return {
        rules: rules,
        updates: updates
    }
}

main = async () => {
    await fs.readFile('./05.txt', 'utf8', async (err, data) => {
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