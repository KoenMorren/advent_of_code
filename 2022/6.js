const fs = require('fs');

main = () => {
    fs.readFile('./5_input.txt', 'utf8', (err, data) => {
        data = data.split('\n')
    });
};

main();