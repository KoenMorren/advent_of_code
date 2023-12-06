const fs = require('fs');
 
p1 = async () => {
    await fs.readFile('./5_input.txt', 'utf8', (err, data) => {
        data = data.replaceAll('\r', '').split('\n').filter(x => x !== '');
 
        const parsed = parseData(data);
 
        const result = parsed.seeds.map(x => determineMapping(x, parsed.seedToSoil))
                                   .map(x => determineMapping(x, parsed.soilToFertilizer))
                                   .map(x => determineMapping(x, parsed.fertilizerToWater))
                                   .map(x => determineMapping(x, parsed.waterToLight))
                                   .map(x => determineMapping(x, parsed.lightToTemperature))
                                   .map(x => determineMapping(x, parsed.temperatureToHumidity))
                                   .map(x => determineMapping(x, parsed.humidityToLocation))
                                   .sort((a, b) => a - b)[0];
 
        console.log("Part 1", result);
    });
};
 
p2 = async () => {
    await fs.readFile('./5_input.txt', 'utf8', (err, data) => {
        data = data.replaceAll('\r', '').split('\n').filter(x => x !== '');
 
        const parsed = parseData(data);
 
        console.log(parsed.seeds[0], parsed.seeds[1])
        console.log(parsed.seedToSoil.sort((a, b) => a[1] - b[1]))

        console.log(parsed.seedToSoil.sort((a, b) => a[1] - b[1]).map(x => [x[0], x[1], x[2], x[1] + x[2] - 1]))

        console.log(parsed.seedToSoil.sort((a, b) => a[1] - b[1])
                              .filter(x => determineRangeOverlap([parsed.seeds[0], parsed.seeds[0] + parsed.seeds[1] - 1], [x[1], x[1] + x[2] - 1])))
 
        console.log("Part 2", null);
    });
};
 
parseData = (data) => {
    let parsed = {
        seeds: [],
        seedToSoil: [],
        soilToFertilizer: [],
        fertilizerToWater: [],
        waterToLight: [],
        lightToTemperature: [],
        temperatureToHumidity: [],
        humidityToLocation: [],
    }

    parsed.seeds.push(...data[0].split(': ')[1].split(' ').map(x => parseInt(x)));
 
    let lastMap = '';
    for (let i = 1; i < data.length; i++) {
        if (data[i].indexOf('map') !== -1) {
            lastMap = data[i];
            continue;
        }
 
        let arr = [];
        switch (lastMap) {
            case 'seed-to-soil map:': arr = parsed.seedToSoil; break;
            case 'soil-to-fertilizer map:': arr = parsed.soilToFertilizer; break;
            case 'fertilizer-to-water map:': arr = parsed.fertilizerToWater; break;
            case 'water-to-light map:': arr = parsed.waterToLight; break;
            case 'light-to-temperature map:': arr = parsed.lightToTemperature; break;
            case 'temperature-to-humidity map:': arr = parsed.temperatureToHumidity; break;
            case 'humidity-to-location map:': arr = parsed.humidityToLocation; break;
        }
 
        var tmp = data[i].split(' ').map(x => parseInt(x))
        arr.push([tmp[0], tmp[1], tmp[1] + tmp[2] - 1])
    }
    lastMap = '';

    return parsed;
}
 
determineMapping = (number, map) => {
    let match = map.filter(x => number >= x[1] && number <= x[2])[0];
 
    if (!match) 
        return number;
    return match[0] + number - match[1];
}
 
determineRangeOverlap = (range1, range2) => {
    return !(range1[1] < range2[0] || range2[1] < range1[0])
}
 
main = async () => {
    await p1();
    await p2();
}
 
main();