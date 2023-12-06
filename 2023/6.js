const fs = require('fs');
 
p1 = async () => {
    await fs.readFile('./6_input.txt', 'utf8', (err, data) => {
        data = data.split('\n');
 
        const races = parseData(data);
 
        let result = races.map(x => {
            let winners = 0;
            for (let i = 0; i < x[0]; i++) {
                let distance = i * (x[0] - i)
 
                if (distance > x[1]) 
                    winners++
            }
 
            return winners;
        }).reduce((p, c) => p * c, 1);
 
        console.log("Part 1", result);
    });
};
 
p2 = async () => {
    await fs.readFile('./6_input.txt', 'utf8', (err, data) => {
        data = data.split('\n');
 
        const time = parseInt(data[0].split(': ')[1].replaceAll(' ', ''))
        const distance = parseInt(data[1].split(': ')[1].replaceAll(' ', ''))
 
        let result = [[time, distance]].map(x => {
            let winners = 0;
            for (let i = 0; i < x[0]; i++) {
                let distance = i * (x[0] - i)
 
                if (distance > x[1]) 
                    winners++
            }
 
            return winners;
        }).reduce((p, c) => p * c, 1);
 
 
        console.log("Part 2", result);
    });
};
 
parseData = (data) => {
    var a = [
        data[0].split(': ')[1].trim().split(' ').filter(x => x).map(x => parseInt(x)),
        data[1].split(': ')[1].trim().split(' ').filter(x => x).map(x => parseInt(x))
    ]
 
    return zip(a[0], a[1])
}
 
zip = (a, b) => a.map((k, i) => [k, b[i]]);
 
main = async () => {
    await p1();
    await p2();
}
 
main();