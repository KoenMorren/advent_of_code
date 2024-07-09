const fs = require('fs');

p1 = (data) => {
    const regex = /-?[0-9]\d*/g;

    const raceDuration = 2503

    let results = data.map(element => {
        let timer = 0;
        let distance = 0;
        while (timer < raceDuration) {
            let flightTime = element[2] - (raceDuration - timer - 1);
            flightTime = flightTime < 0 ?  element[2] : flightTime;
            
            distance += (flightTime * element[1]);
            timer += flightTime + element[3]
        }

        return [element[0], distance]
    });

    return results.sort((a, b) => a[1] - b[1]).last()[1]

    // using map per second, it's very easy to find the longest distance at interval X

    // let race = constructRaceMap(data, raceDuration);
    // console.log('part 1:', Math.max(...race.map(x => x[1][raceDuration])))
}

p2 = (data) => {
    const raceDuration = 2503

    let race = constructRaceMap(data, raceDuration);
    
    let score = {}
    data.forEach(x => score[x[0]] = 0);
    
    for (let i = 1; i < raceDuration; i++) {
        let max = Math.max(...race.map(x => x[1][i]))
        let winners = race.filter(x => x[1][i] === max);
        
        winners.forEach(x => score[x[0]]++)
    }

    return Object.entries(score).sort((a, b) => a[1] - b[1]).last()[1]
}

parseData = (data) => {
    const regex = /([a-zA-Z]*)( can fly )(\d*)( km\/s for )(\d*)( seconds\, but then must rest for )(\d*)( seconds\.)/;

    return data.split('\n')
        .map(x => regex.exec(x))
        .map(x => [x[1], parseInt(x[3]), parseInt(x[5]), parseInt(x[7])])
}

constructRaceMap = (data, duration) => {
    let race = data.map(x => {
        let distance = [0];
        while(distance.length < duration) {
            for (let i = 0; i < x[2]; i++) {
                distance.push(distance.last() + x[1])
            }
            for (let i = 0; i < x[3]; i++) {
                distance.push(distance.last())
            }
        }
        
        return [x[0], distance]
    })

    return race.map(x => { x[1] = x[1].slice(0, duration + 1); return x })
}

main = async () => {
    if (!Array.prototype.last) {
        Array.prototype.last = function() {
            return this[this.length - 1]
        }
    }

    await fs.readFile('./14.txt', 'utf8', async (err, data) => {
        data = parseData(data)

        console.log('part 1:', p1(structuredClone(data)));
        console.log('part 2:', p2(structuredClone(data)));
    });
}

main();