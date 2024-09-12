const fs = require('fs');

p1 = (data) => {
    let combinations = generateCombinations(data, data.sum() / 3)
                            .sort((a, b) => a.entanglement() - b.entanglement())

    let solution = null;

    // clean up the loops

    for (let i = 0; i < combinations.length; i++) {
        let aCombinations = combinations.filter(x => x.canCoexist(combinations[i]))

        for (let j = 0; j < aCombinations.length; j++) {
            let bCombinations = aCombinations.filter(x => x.canCoexist(aCombinations[j]))

            if (bCombinations.length > 0) {
                solution = solution = [combinations[i], aCombinations[j], bCombinations[0]]
                break
            }
        }   
        if (solution) break;
    }

    console.log(solution[0].entanglement())

    return solution
}

p2 = (data) => {
    let combinations = generateCombinations(data, data.sum() / 4)
                            .sort((a, b) => a.entanglement() - b.entanglement())

    let solution = null;

    // clean up the loops

    for (let i = 0; i < combinations.length; i++) {
        let aCombinations = combinations.filter(x => x.canCoexist(combinations[i]))

        for (let j = 0; j < aCombinations.length; j++) {
            let bCombinations = aCombinations.filter(x => x.canCoexist(aCombinations[j]))
            
            for (let k = 0; k < bCombinations.length; k++) {
                let cCombinations = bCombinations.filter(x => x.canCoexist(bCombinations[k]))

                if (cCombinations.length > 0) {
                    solution = solution = [combinations[i], aCombinations[j], bCombinations[k], cCombinations[0]]
                    break
                }
            }
            if (solution) break;
        }   
        if (solution) break;
    }

    console.log(solution[0].entanglement())

    return solution;
}

generateCombinations = (items, target) => {
    let combinations = [];

    function generateCombination(items, currentCombination) {
        if (currentCombination.sum() === target) {    
            combinations.push(structuredClone(currentCombination))
            return
        }

        if (items.length === 0) {
            return
        }

        let curr = items[0]
        let remainder = items.slice(1)

        // adding the current value
        if (currentCombination.sum() + curr <= target) {
            currentCombination.push(curr)
            generateCombination(remainder, currentCombination)
            currentCombination.pop()
        }

        // not adding the current value
        generateCombination(remainder, currentCombination)
    }

    generateCombination(items, [])
    return combinations;
}

main = async () => {
    if (!Array.prototype.sum) {
        Array.prototype.sum = function() {
            return this.reduce((p, c) => p + c, 0)
        }
    }
    if (!Array.prototype.entanglement) {
        Array.prototype.entanglement = function() {
            return this.reduce((p, c) => p * c, 1)
        }
    }
    if (!Array.prototype.canCoexist) {
        Array.prototype.canCoexist = function(coexistWith) {
            return this.filter(x => coexistWith.indexOf(x) !== -1).length === 0
        }
    }

    await fs.readFile('./24.txt', 'utf8', async (err, data) => {
        data = '1\r\n3\r\n5\r\n11\r\n13\r\n17\r\n19\r\n23\r\n29\r\n31\r\n37\r\n41\r\n43\r\n47\r\n53\r\n59\r\n67\r\n71\r\n73\r\n79\r\n83\r\n89\r\n97\r\n101\r\n103\r\n107\r\n109\r\n113'

        data = data.split('\r\n')
                   .reverse()
                   .map(x => parseInt(x));

        console.log('part 1:', measure(() => p1(structuredClone(data))))
        console.log('part 2:', measure(() => p2(structuredClone(data))))
    });
}

measure = (fn) => {
    const start = performance.now();
    let result = fn();
    const end = performance.now();

    return `${result} (${Math.round((end - start) * 10000) / 10000} ms)`;
}

main()