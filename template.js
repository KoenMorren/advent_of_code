const fs = require('fs');

p1 = async () => {
    await fs.readFile('./1_input.txt', 'utf8', (err, data) => {
        data = data.split('\n');



        console.log("Part 1", null);
    });
};

p2 = async () => {
    await fs.readFile('./1_input.txt', 'utf8', (err, data) => {
        data = data.split('\n');


        
        console.log("Part 2", null);
    });
};

main = async () => {
    await p1();
    await p2();
}

main();