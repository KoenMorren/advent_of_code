const fs = require('fs');

main = () => {
    fs.readFile('./1_input.txt', 'utf8', (err, data) => {
        var mvmts = [...data];

        // part 1
        var up = mvmts.filter(x => x == '(').length;
        var down = mvmts.length - up;
        console.log("Part 1", up - down);

        // part 2
        var start = 0;
    
        for (var i = 1; i <= mvmts.length; i++)
        {
            if (mvmts[i] == '(') 
                start += 1;
            else 
                start -= 1;
    
            if (start < 0) break;
        }
    
        console.log("Part 2", i);
    });
};

main();