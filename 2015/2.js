const fs = require('fs');

main = () => {
    fs.readFile('./2_input.txt', 'utf8', (err, data) => {
        data = '1x1x10';

        var presents = data.split(';');

        var totalArea = 0;

        presents.forEach(x => {
            var [l, w, h] = x.split('x');
            
            var area = [
                l*w,
                w*h,
                h*l
            ]
            area.sort();
            // console.log(area, area.reduce((prev, curr) => prev +  2 * curr))
            totalArea += area.reduce((prev, curr) => {
                // console.log(prev,curr)
                return prev +  2 * curr;
            }, 0) + area[0]
        });

        console.log("Part 1", totalArea);
    });
};

main();