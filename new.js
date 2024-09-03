const fs = require('fs')
const path = require('path');

main = () => {
    const args = process.argv.slice(2);

    if (args.length !== 2) {
        console.log('not enough arguments provided');
        return;
    }

    [year, day] = [...args]

    if (!fs.existsSync(`./${year}`))
        fs.mkdir(path.join(__dirname, year), (err) => {})

    if (fs.existsSync(path.join(__dirname, year, `${day}.js`))) {
        console.log('file already exists!')
        return
    }

    fs.copyFileSync(
        path.join(__dirname, 'template.js'),
        path.join(__dirname, year, `${day}.js`)
    )

    fs.readFile(path.join(__dirname, year, `${day}.js`), 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }
        var result = data.replace(/\{\{DAY\}\}/g, day);
      
        fs.writeFile(path.join(__dirname, year, `${day}.js`), result, 'utf8', function (err) {
           if (err) return console.log(err);
        })
      })

    fs.writeFile(
        path.join(__dirname, year, `${day}.txt`),
        '',
        err => {}
    )
}

main();