const SALT = 1352;

p1 = () => {
    let start = [1, 1]
    let target = [31, 39]

    heuristic = (a, b) => {
        return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1])
    }

    aStar = (start, target) => {
        // https://www.redblobgames.com/pathfinding/a-star/introduction.html
    
        frontier = new PriorityQueue()
        frontier.enqueue(start, 0)
        cameFrom = {}
        costSoFar = {}
        cameFrom[start] = null
        costSoFar[start] = 0
    
        while (frontier.size() > 0) {
            let current = frontier.dequeue().node
            
            if (current.toString() == target.toString())
                break
    
            getNeighbours(current).forEach(n => {
                let newCost = costSoFar[current] + 1
                if ((costSoFar[n] || Number.POSITIVE_INFINITY) > newCost) {
                    costSoFar[n] = newCost
                    let priority = newCost + heuristic(target, n)
                    frontier.enqueue(n, priority)
                    cameFrom[n] = current
                }
            })
        }
    
        return costSoFar[target]
    }

    return aStar(start, target)
};

p2 = () => {
    var start = [1, 1]
    var neighbours = [start.toString()]

    step = (start, stepsRemaining) => {
        if (stepsRemaining < 0)
            return

        stepsRemaining--

        getNeighbours(start)
            .filter(x => !neighbours.contains(x.toString()))
            .forEach(x => {
                neighbours.push(x.toString())
                step(x, stepsRemaining)
            })
    }

    step(start, 50);

    // No idea why this gives me the correct number, whilst explicitly transforming it into a set removes 11 items
    // I would think that the filtering done in the step() method does the same thing??
    // I'm horribly confused
    return neighbours.length;
    // return new Set(neighbours).size;
}

isWall = (x, y) => {
    let t = x*x + 3*x + 2*x*y + y + y*y + SALT
    return t.toString(2).replaceAll('0', '').length % 2 !== 0
}

getNeighbours = (current) => {
    let neighbours = []

    if (current[0] !== 0 && !isWall(current[0] - 1, current[1])) neighbours.push([current[0] - 1, current[1]])
    if (!isWall(current[0] + 1, current[1])) neighbours.push([current[0] + 1, current[1]])
    if (current[1] !== 0 && !isWall(current[0], current[1] - 1)) neighbours.push([current[0], current[1] - 1])
    if (!isWall(current[0], current[1] + 1)) neighbours.push([current[0], current[1] + 1])

    return neighbours
}

class PriorityQueue{
    constructor(){
        this.values = [];
    }
    
    enqueue(node, priority){
        var flag = false;
        for(let i=0; i<this.values.length; i++){
            if(this.values[i].priority>priority){
                this.values.splice(i, 0, {node, priority})
                flag = true;
                break;
            }
        }
        if(!flag){
            this.values.push({node, priority})
        }
    }
    
    dequeue(){
        return this.values.shift()
    }
    
    size(){
        return this.values.length;
    }
}

main = () => {
    if (!Array.prototype.contains) {
        Array.prototype.contains = function(that) {
            return this.indexOf(that) !== -1
        }
    }

    console.log('part 1:', p1());
    console.log('part 2:', p2());
}

main();