const fs = require('fs');

const row = 2978 - 1
const col = 3083 - 1

p1 = () => {
    let cantor = [[20151125]];

    let currentI = -1;
    let root = 20151125;
    while(!(cantor[row] || [])[col]){
        if (currentI === -1) {
        currentI = cantor.length
            cantor[currentI] = []
        }

        root = next(root)
        cantor[currentI].push(root);
        currentI--;
    }
    
    return cantor[row][col]
}

p2 = () => {
    return null
}

parse = (data) => {
    return data.split('\r\n')
        .map(x => x.replace(',', '').split(' '))
}

next = (n) => {
    return (n * 252533) % 33554393
}

main = () => {
    if (!Array.prototype.last) {
        Array.prototype.last = function() {
            return this[this.length - 1]
        }
    }

    console.log('part 1:', p1());
    console.log('part 2:', p2());
}

main();