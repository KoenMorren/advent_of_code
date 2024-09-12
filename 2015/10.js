p1 = (data) => {
    const n = 40;

    for(let i = 0; i < n; i++) {
        data = transform(data);
    }

    return data.length
}

p2 = (data) => {
    const n = 50;

    for(let i = 0; i < n; i++) {
        data = transform(data);
    }

    return data.length
}

transform = (input) => {
    data = input.split('')

    let curr = data[0];
    let count = 1;
    let result = '';
    
    for (let i = 1; i < data.length; i++) {
        if (data[i] !== curr) {
            result = `${result}${count}${curr}`
            curr = data[i]
            count = 1
            continue
        }

        count++;
    }

    result += `${count}${curr}`

    return result;
}

main = () => {
    const input = '3113322113';

    console.log('part 1:', measure(() => p1(input)))
    console.log('part 2:', measure(() => p2(input)))
}

measure = (fn) => {
    const start = performance.now();
    let result = fn();
    const end = performance.now();

    return `${result} (${Math.round((end - start) * 10000) / 10000} ms)`;
}

main()