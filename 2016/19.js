p1 = (data) => {
    let elves = new Array(data).fill(0).map((_, i) => i + 1)

    while (elves.length > 1) {
        let isOdd = elves.length % 2 == 1
        elves = elves.filter((_, i) => i % 2 == 0)

        if (isOdd)
            elves.shift()
    }

    return elves
};

p2 = (data) => {
    // THIS DOESNT WORK BECAUSE IT ASSUMES THAT EVERY ELF STEALS AT THE SAME TIME
    // let elves = new Array(data).fill(0).map((_, i) => i + 1)
    // while (elves.length > 1) {
    //     let isOdd = elves.length % 2 == 1
    //     let temp = null

    //     if (isOdd) 
    //         temp = elves[elves.length - 1]
        
    //     let halfway = Math.floor(elves.length / 2)
    //     elves.splice(halfway)
        
    //     if (temp) {
    //         halfway = Math.floor(elves.length / 2)
    //         elves.splice(halfway - 1, 1)
    //         elves.push(temp)
    //     }

    //     console.log(elves)
    // }
    // return elves

    // NOT SURE WHAT THIS MAGIC IS
    let pow = Math.floor(Math.log(data) / Math.log(3));
	let b = Math.pow(3, pow);
	if (data == b)
		return n;
	if (data - b <= b)
		return data - b;
	return 2 * data - 3 * b;
}

parse = (data) => {
    return data;
}

main = async () => {
    let elvesAmount = 3001330

    console.log('part 1:', measure(() => p1(elvesAmount)));
    console.log('part 2:', measure(() => p2(elvesAmount)));
}

measure = (fn) => {
    const start = performance.now();
    let result = fn();
    const end = performance.now();

    return `${result} (${Math.round((end - start) * 10000) / 10000} ms)`;
}

main();