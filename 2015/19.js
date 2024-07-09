const fs = require('fs');

p1 = (data) => {
    // data = {
    //     molecule: 'H2O',
    //     dict: {
    //         'H': [
    //             'OO',
    //         ],
    //     }
    // }

    let transformed = new Set();

    Object.keys(data.dict).forEach(x => {
        let re = new RegExp(String.raw`(${x})`, "g");
        let match;

        while (!!(match = re.exec(data.molecule))) {
            data.dict[x].forEach(y => {
                    transformed.add(data.molecule.substring(0, match.index) + data.molecule.substring(match.index).replace(x, y))
            })
        }
    })

    return transformed.size
}

p2 = (data) => {
    return null
}

parseData = (data) => {
    let dict = {};
    let molecule = ''

    data.split('\r\n')
        .forEach(x => {
            if (x.indexOf('=>') !== -1) {
                let translation = x.split(' => ');
                if (Object.keys(dict).indexOf(translation[0]) === -1)
                    dict[translation[0]] = []
                dict[translation[0]].push(translation[1])
            } else {
                molecule = x;
            }
        })

    return {
        molecule: molecule,
        dict: dict
    }
}

main = async () => {
    if (!Array.prototype.last) {
        Array.prototype.last = function() {
            return this[this.length - 1]
        }
    }

    await fs.readFile('./19.txt', 'utf8', async (err, data) => {
        data = parseData(data)

        console.log('part 1:', p1(structuredClone(data)));
        console.log('part 2:', p2(structuredClone(data)));
    });
}

main();