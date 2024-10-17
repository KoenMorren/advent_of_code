const fs = require('fs');

p1 = (data) => {
    let rows = 40

    return calcSafeTiles(data, rows)
};

p2 = (data) => {
    let rows = 400000

    return calcSafeTiles(data, rows)
}

determineTileIsSafe = (left, center, right) => {
    if (
        (!left && !center && right)
        || (left && !center && !right)
        || (!left && center && right)
        || (left && center && !right)
    )
        return false
    
    return true
}

createNextRow = (prevRow) => {
    let newRow = new Array(prevRow.length)

    for (let i = 0; i < newRow.length; i++) {
        newRow[i] = determineTileIsSafe(prevRow[i - 1] ?? true, prevRow[i], prevRow[i + 1] ?? true)
    }

    return newRow;
}

calcSafeTiles = (startRow, rowAmount) => {
    let safeTiles = startRow.filter(x => x).length

    for (let i = 1; i < rowAmount; i++) {
        startRow = createNextRow(startRow)
        safeTiles += startRow.filter(x => x).length
    }

    return safeTiles
}

parse = (data) => {
    return data.split('').map(x => x === '.' ? true : false);
}

main = async () => {
    await fs.readFile('./18.txt', 'utf8', async (err, data) => {
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