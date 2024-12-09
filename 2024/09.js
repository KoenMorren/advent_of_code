const fs = require('fs');

p1 = (data) => {
    // ! Filenames can be longer than 1 character
    let expanded = expand(data.split(''))
    let fragmented = fragment(expanded)

    return checksum(fragmented)
};

p2 = (data) => {
    let expanded = expand(data.split(''))
    let fileName = expanded[expanded.length - 1]
    let compacted = compact(expanded, fileName)

    return checksum(compacted)
}

expand = (data) => {
    let expanded = []
    let fileName = 0;

    for (let i = 0; i < data.length; i++) {
        let value = parseInt(data[i])

        let name = i % 2 == 0 ? fileName++ : '.'

        for (let r = 0; r < value; r++) {
            expanded.push(name)
        }
    }

    return expanded
}

fragment = (data) => {
    let lastData = data.length

    for (let i = 0; i < data.length; i++) {
        if (data[i] !== '.')
            continue

        if (i >= lastData)
            break

        for (let j = lastData - 1; j >= 0; j--) {
            if (j <= i)
                break

            if (data[j] === '.')
                continue


            data[i] = data[j]
            data[j] = '.'
            lastData = j
            break;
        }
    }

    return data;
}

compact = (data, lastFileName) => {
    for (let f = lastFileName; f >= 0; f--) {
        let indexes = []
        
        for (let i = 0; i < data.length; i++) {
            if (data[i] === f) 
            indexes.push(i)
        }
        
        for (let i = 0; i < indexes[0]; i++) {
            if (data[i] !== '.')
                continue
            
            let isEmpty = true;
            for (let j = 0; j < indexes.length; j++) {
                isEmpty = isEmpty && data[i + j] === '.'
            }

            if (isEmpty) {
                for (let j = 0; j < indexes.length; j++) {
                    data[i + j] = f
                }
                indexes.forEach(x => data[x] = '.')
                break
            }
        }
    }

    return data
}

checksum = (data) => {
    return data
            .map((x, i) => parseInt(x) * i || 0)
            .reduce((p, c) => p + c, 0)
}

parse = (data) => {
    return data.split('\n').toString();
}

main = async () => {
    await fs.readFile('./09.txt', 'utf8', async (err, data) => {
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