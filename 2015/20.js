p1 = (minimum) => {
    const presents = new Array(minimum/10).fill(0)

    // Problem:
    // Naive approach means that every next house, all previous iterations need to be checked
    // -> Repeats a lot of work
    // Instead, turn it into a memory problem
    // Loop over all the elves, and all the houses up till minimum / 10 
    // (which is a guess that the solution will fall within that number)
    // Update the gifts for each house that that elf reaches, and then determine the house with the lowest index
    // This means that we need to loop over all the elves, and can't intermittendly check
    // -> for not all the elves that would reach that house would have been calculated

    for (let e = 1; e < minimum / 10; e++) {
        for (let i = e; i < minimum / 10; i = i + e) {
            presents[i] += e * 10
        }
    }

    return presents.reduce((min, current, index) => (min === 0 && current >= minimum) ? min = index : min, 0)
}

p2 = (minimum) => {
    const presents = new Array(minimum/10).fill(0)

    for (let e = 1; e < minimum / 10; e++) {
        let visits = 0
        for (let i = e; i < minimum / 10; i = i + e) {
            if (visits < 50) {
                presents[i] += e * 11
                visits++
            }
        }
    }

    return presents.reduce((min, current, index) => (min === 0 && current >= minimum) ? min = index : min, 0)
}

main = () => {
    const INPUT = 29000000;

    console.log('part 1:', measure(() => p1(INPUT)))
    console.log('part 2:', measure(() => p2(INPUT)))
}

measure = (fn) => {
    const start = performance.now();
    let result = fn();
    const end = performance.now();

    return `${result} (${Math.round((end - start) * 10000) / 10000} ms)`;
}

main();