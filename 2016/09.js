const fs = require('fs');

p1 = (data) => {
    return decompress(data, x => x.length)
}

p2 = (data) => {
    return decompress(data, decompress)
}

decompress = (data, recurse) => {
    const regex = /^\((\d+)x(\d+)\)(.*)$/
    let decompressed_length = 0;
      
    // Loop over entire string starting from the beginning
    // Whenever a bit of string is decompressed, trim it from the data string
    // The regex creates the following
    // - match[1] = The amount of symbols to decompress
    // - match[2] = The amount of times the decompression needs to happen
    // - match[3] = The entire remainder of the input string
    
    while (data.length > 0) {
        if (data[0] === "(") {
            const match = regex.exec(data);
            const sublength = recurse(match[3].substring(0, +match[1]), recurse);
            
            decompressed_length += sublength*(+match[2]);
            data = match[3].substring(+match[1]);
        } else {
            decompressed_length += 1;
            data = data.substr(1);
        }
    }
    
    return decompressed_length;
}

parse = (data) => {
    return data.trim();
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