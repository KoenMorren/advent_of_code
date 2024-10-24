const fs = require('fs');

p1 = (data) => {
    return data.map(supportsTLS)
               .filter(x => x)
               .length

    function supportsTLS(ip) {
        var isInsideBracket = false;
        var hasABBAOutsideOfBrackets = false;
        var hasABBAInsideOfBrackets = false;
        ip = ip.split('')
    
        for (let i = 0; i < ip.length - 3; i++) {
            if (ip[i] === '[') { 
                isInsideBracket = true
                continue
            }
            if (ip[i] === ']') { 
                isInsideBracket = false
                continue
            }
    
            let slice = ip.slice(i, i + 4)
            if (isABBA(slice)) {
                if (!isInsideBracket)
                    hasABBAOutsideOfBrackets = true
                else 
                    hasABBAInsideOfBrackets = true
            }
        }
    
        return hasABBAOutsideOfBrackets && !hasABBAInsideOfBrackets
    }
    
    function isABBA(arr) {
        return arr[0] == arr[3]
                && arr[1] == arr[2]
                && arr[0] != arr[1]
    }
};

p2 = (data) => {
    return data.map(supportsSSL)
               .filter(x => x)
               .length

    function supportsSSL(ip) {
        var isInsideBracket = false;
        var ABAs = []
        var BABs = []
        ip = ip.split('')
    
        for (let i = 0; i < ip.length - 2; i++) {
            if (ip[i] === '[') { 
                isInsideBracket = true
                continue
            }
            if (ip[i] === ']') { 
                isInsideBracket = false
                continue
            }
    
            let slice = ip.slice(i, i + 3)
            if (isABA(slice)) {
                if (!isInsideBracket) 
                    ABAs.push(slice)
                else 
                    BABs.push(slice)
            }
        }
    
        return ABAs.map(x => [x[1], x[0], x[1]].join(''))
                    .filter(x => BABs.map(y => y.join('')).indexOf(x) !== -1).length > 0
    }

    function isABA (arr) {
        return arr[0] == arr[2]
            && arr[0] != arr[1]
            && (arr[1] != '[' && arr[1] != ']')
    }
}

parse = (data) => {
    return data.split('\r\n');
}

main = async () => {
    await fs.readFile('./07.txt', 'utf8', async (err, data) => {
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