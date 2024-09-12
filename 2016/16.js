p1 = (input, length) => {
    let data = generateData(input, length)
    let checksum = generateChecksum(data)

    return checksum
};

p2 = (input, length) => {
    let data = generateData(input, length)
    let checksum = generateChecksum(data)

    return checksum
}

generateData = (input, length) => {
    let output = input

    while (output.length < length) {
        t = output
                .split('')
                .reverse()
                .join('')
                .replaceAll('0', 'a')
                .replaceAll('1', '0')
                .replaceAll('a', '1')

        output = `${output}0${t}`
    }

    return output.substring(0, length)
}

generateChecksum = (input) => {
    calcChecksum = (input) => {
        let t = ''
        
        for (let i = 1; i < input.length; i += 2) {
            if (input.charAt(i - 1) === input.charAt(i))
                t += '1'
            else 
            t += '0'
        }
    
        return t
    }

    let checksum = calcChecksum(input)

    while (checksum.length % 2 === 0) {
        checksum = calcChecksum(checksum)
    }

    return checksum
}

parse = (data) => {
    return data;
}

main = () => {
    const input = '01111001100111011'

    console.log('part 1:', measure(() => p1(input, 272)));
    console.log('part 2:', measure(() => p2(input, 35651584)));
}

measure = (fn) => {
    const start = performance.now();
    let result = fn();
    const end = performance.now();

    return `${result} (${Math.round((end - start) * 10000) / 10000} ms)`;
}

main();