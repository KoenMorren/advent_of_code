const fs = require('fs');
 
p1 = async () => {
    await fs.readFile('./5_input.txt', 'utf8', (err, data) => {
        data = data.replaceAll('\r', '').split('\n').filter(x => x !== '');
 
        let seeds = [];
        let seedToSoil = [];
        let soilToFertilizer = [];
        let fertilizerToWater = [];
        let waterToLight = [];
        let lightToTemperature = [];
        let temperatureToHumidity = [];
        let humidityToLocation = [];
 
        parseData(data, seeds, seedToSoil, soilToFertilizer, fertilizerToWater, waterToLight, lightToTemperature, temperatureToHumidity, humidityToLocation);
 
        console.log(seeds)
 
        const result = seeds.map(x => determineMapping(x, seedToSoil))
                            .map(x => determineMapping(x, soilToFertilizer))
                            .map(x => determineMapping(x, fertilizerToWater))
                            .map(x => determineMapping(x, waterToLight))
                            .map(x => determineMapping(x, lightToTemperature))
                            .map(x => determineMapping(x, temperatureToHumidity))
                            .map(x => determineMapping(x, humidityToLocation))
                            .sort((a, b) => a - b)[0];
 
        console.log("Part 1", result);
    });
};
 
p2 = async () => {
    await fs.readFile('./5_input.txt', 'utf8', (err, data) => {
        data = data.replaceAll('\r', '').split('\n').filter(x => x !== '');
 
        let seeds = [];
        let seedToSoil = [];
        let soilToFertilizer = [];
        let fertilizerToWater = [];
        let waterToLight = [];
        let lightToTemperature = [];
        let temperatureToHumidity = [];
        let humidityToLocation = [];
 
        parseData(data, seeds, seedToSoil, soilToFertilizer, fertilizerToWater, waterToLight, lightToTemperature, temperatureToHumidity, humidityToLocation);
 
        const seedIterator = [...seeds];
        let minimum = null;
        for (let i = 0; i < seedIterator.length; i++) {
            if (i % 2 === 1)
                continue
 
            for (let j = 0; j < seedIterator[i + 1]; j++) {
                let location = [seedIterator[i] + j].map(x => determineMapping(x, seedToSoil))
                .map(x => determineMapping(x, soilToFertilizer))
                .map(x => determineMapping(x, fertilizerToWater))
                .map(x => determineMapping(x, waterToLight))
                .map(x => determineMapping(x, lightToTemperature))
                .map(x => determineMapping(x, temperatureToHumidity))
                .map(x => determineMapping(x, humidityToLocation))[0];
 
                minimum = minimum ? Math.min(minimum, location) : location;
            }
        }
 
        console.log("Part 2", minimum);
    });
};
 
parseData = (data, seeds, seedToSoil, soilToFertilizer, fertilizerToWater, waterToLight, lightToTemperature, temperatureToHumidity, humidityToLocation) => {
    seeds = seeds.push(...data[0].split(': ')[1].split(' ').map(x => parseInt(x)));
 
    let lastMap = '';
    for (let i = 1; i < data.length; i++) {
        if (data[i].indexOf('map') !== -1) {
            lastMap = data[i];
            continue;
        }
 
        let arr = [];
        switch (lastMap) {
            case 'seed-to-soil map:': arr = seedToSoil; break;
            case 'soil-to-fertilizer map:': arr = soilToFertilizer; break;
            case 'fertilizer-to-water map:': arr = fertilizerToWater; break;
            case 'water-to-light map:': arr = waterToLight; break;
            case 'light-to-temperature map:': arr = lightToTemperature; break;
            case 'temperature-to-humidity map:': arr = temperatureToHumidity; break;
            case 'humidity-to-location map:': arr = humidityToLocation; break;
        }
 
        arr.push(data[i].split(' ').map(x => parseInt(x)))
    }
    lastMap = '';
}
 
determineMapping = (number, map) => {
    let match = map.filter(x => number >= x[1] && number <= x[1] + x[2] - 1)[0];
 
    if (!match) 
        return number;
    return match[0] + number - match[1];
}
 
determineMappingRange = (range, map) => {
 
}
 
main = async () => {
    await p1();
    await p2();
}
 
main();