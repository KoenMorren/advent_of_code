const fs = require('fs');

const isNumeric = /[0-9]/;
const isSymbol = /[^0-9\.]/;
const isGear = /[*]/;

p1 = async () => {
    await fs.readFile('./3_input.txt', 'utf8', (err, data) => {
        data = data.split('\n');
        data = data.map(x => x.split(''));

        let total = 0;

        for (let i = 0; i < data.length; i++) {
            for(let j = 0; j < data[i].length; j++) {
                if (!data[i][j].match(isSymbol))
                    continue;

                if (i > 0) { // look up
                    let n = getNumber(data[i - 1], j);
                    let nL = getNumber(data[i - 1], j - 1);
                    let nR = getNumber(data[i - 1], j + 1);

                    total += n;

                    if (n !== nL)
                        total += nL
                    if (n !== nR)
                        total += nR
                }
                total += getNumber(data[i], j - 1); // look left
                total += getNumber(data[i], j + 1); // look right
                if (i < data.length - 1) { // look down
                    let n = getNumber(data[i + 1], j);
                    let nL = getNumber(data[i + 1], j - 1);
                    let nR = getNumber(data[i + 1], j + 1);

                    total += n;

                    if (n !== nL)
                        total += nL
                    if (n !== nR)
                        total += nR
                }
            }
        }

        console.log("Part 1", total);
    });
};

p2 = async () => {
    await fs.readFile('./3_input.txt', 'utf8', (err, data) => {
        data = data.split('\n');
        data = data.map(x => x.split(''));

        let total = 0;

        for (let i = 0; i < data.length; i++) {
            for(let j = 0; j < data[i].length; j++) {
                if (!data[i][j].match(isGear))
                    continue;

                let numbers = [];

                if (i > 0) { // look up
                    let n = getNumber(data[i - 1], j);
                    let nL = getNumber(data[i - 1], j - 1);
                    let nR = getNumber(data[i - 1], j + 1);

                    numbers.push(n);

                    if (n !== nL)
                        numbers.push(nL);
                    if (n !== nR)
                        numbers.push(nR);
                }
                numbers.push(getNumber(data[i], j - 1)); // look left
                numbers.push(getNumber(data[i], j + 1)); // look right
                if (i < data.length - 1) { // look down
                    let n = getNumber(data[i + 1], j);
                    let nL = getNumber(data[i + 1], j - 1);
                    let nR = getNumber(data[i + 1], j + 1);

                    numbers.push(n);

                    if (n !== nL)
                        numbers.push(nL);
                    if (n !== nR)
                        numbers.push(nR);
                }

                numbers = numbers.filter(x => x !== 0)

                if (numbers.length === 2)
                    total += numbers[0] * numbers[1];
            }
        }

        console.log("Part 2", total);
    });
};

getNumber = (row, index) => {
    if (!row[index].match(isNumeric))
        return 0;

    let lIndex = index - 1;
    let rIndex = index;

    let number = '';
    while(lIndex >= 0)
    {
        if (row[lIndex].match(isNumeric))
            number = row[lIndex] + number;
        else 
            break;
        
        lIndex--;
    }

    while(rIndex <= row.length - 1)
    {
        if (row[rIndex].match(isNumeric))
            number += row[rIndex];
        else 
            break;

        rIndex++;
    }

    return parseInt(number) || 0;
}

main = async () => {
    await p1();
    await p2();
}

main();