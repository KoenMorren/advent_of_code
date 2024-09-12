const alphabet = 'abcdefghijklmnopqrstuvwxyz';

p1 = (data) => {
    while(!isValid(data)) {
        data = increment(data)    
    }

    return data
}

p2 = (data) => {
    while(!isValid(data)) {
        data = increment(data)    
    }

    return data
}

increment = (password) => {
    let arr = password.split('');

    for(let i = arr.length - 1; i >= 0; i--) {
        let char = arr[i];
        let index = alphabet.indexOf(char) + 1;

        arr[i] = alphabet.charAt(index + 1);

        if (index < 26) {
            arr[i] = alphabet.charAt(index);
            break;
        }
        
        arr[i] = alphabet.charAt(0)
    }

    return arr.join('')
}

isValid = (password) => {
    return containsStraight(password)
           && !containsMistaken(password)
           && containsPairs(password)
}

containsStraight = (password) => {
    for (let i = 0; i < 24; i++) {
        let str = alphabet.substring(i, i + 3)

        if (password.indexOf(str) !== -1)
            return true;
    }

    return false;
}

containsMistaken = (password) => {
    return password.indexOf('i') !== -1
           || password.indexOf('o') !== -1
           || password.indexOf('l') !== -1

}

containsPairs = (password) => {
    let pairs = 0;
    let arr = password.split('')

    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] === arr[i + 1]) {
            pairs++;
            i++;
        }
    }

    return pairs >= 2;
}

main = () => {
    console.log('part 1:', measure(() => p1(increment('hxbxwxba'))))
    console.log('part 2:', measure(() => p2(increment('hxbxxyzz'))))
}

measure = (fn) => {
    const start = performance.now();
    let result = fn();
    const end = performance.now();

    return `${result} (${Math.round((end - start) * 10000) / 10000} ms)`;
}

main()