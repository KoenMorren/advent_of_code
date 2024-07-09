const fs = require('fs');

p1 = (data) => {
    const teaspoons = 100;

    data = data.map(x => [x[1], x[2], x[3], x[4]])

    const result = generateRatios(data.length, teaspoons)
        .map(x => {
            let t = new Array(data[0].length).fill(0);

            for (let i = 0; i < x.length; i++) {
                for (let j = 0; j < data[0].length; j++) {
                    t[j] += x[i] * data[i][j]
                }
            }

            return t
        })
        .map(x => x.map(y => y < 0 ? 0 : y))
        .map(x => x[0] * x[1] * x[2] * x[3])
        .sort((a, b) => b - a)[0]

    return result
}

p2 = (data) => {
    const teaspoons = 100;
    const calorieTarget = 500;

    data = data.map(x => [x[1], x[2], x[3], x[4], x[5]])

    const result = generateRatios(data.length, teaspoons)
            .map(x => {
                let t = new Array(data[0].length).fill(0);

                for (let i = 0; i < x.length; i++) {
                    for (let j = 0; j < data[0].length; j++) {
                        t[j] += x[i] * data[i][j]
                    }
                }

                return t
            })
            .map(x => x.map(y => y < 0 ? 0 : y))
            .map(x => [x[0] * x[1] * x[2] * x[3], x[4]])
            .filter(x => x[1] === calorieTarget)
            .sort((a, b) => b[0] - a[0])[0]

    return result[0]
}

parseData = (data) => {
    const regex = /([a-zA-Z]*)(\: capacity )(\-?\d*)(\, durability )(\-?\d*)(\, flavor )(\-?\d*)(\, texture )(\-?\d*)(\, calories )(\-?\d*)/;

    return data.split('\n')
        .map(x => regex.exec(x))
        .map(x => [x[1], parseInt(x[3]), parseInt(x[5]), parseInt(x[7]), parseInt(x[9]), parseInt(x[11])])
}

generateRatios = (ingredientAmount, teaspoonAmount) => {
    let ratios = [];

    for (let i = 0; i <= teaspoonAmount; i++) {
        generate(ratios, [i], ingredientAmount, teaspoonAmount - i);
    }    

    return ratios;
}

generate = (ratios, ratio, ingredientAmount, teaspoonAmount) => {
    if (ratio.length === ingredientAmount - 1) {
        ratios.push([...ratio, teaspoonAmount]);
        return;
    }

    for (let i = 1; i <= teaspoonAmount; i++) {
        generate(ratios, [...ratio, i], ingredientAmount, teaspoonAmount - i)
    }
}

main = async () => {
    if (!Array.prototype.last) {
        Array.prototype.last = function() {
            return this[this.length - 1]
        }
    }

    await fs.readFile('./15.txt', 'utf8', async (err, data) => {
        data = parseData(data)

        console.log('part 1:', p1(structuredClone(data))); // 18965440
        console.log('part 2:', p2(structuredClone(data))); // 15862900
    });
}

main();