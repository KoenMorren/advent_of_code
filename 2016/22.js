const fs = require('fs');

p1 = (data) => {
    let counter = 0;

    for (let i = 0; i < data.length - 1; i++) {
        for (let j = i + 1; j < data.length; j++) {
            // compare both directions!!
            if (isValidPair(data[i], data[j]))
                counter++

            if (isValidPair(data[j], data[i]))
                counter++
        }
    }2

    return counter
};

p2 = (data) => {
    constructGrid = (data) => {
        let maxX = data.sort((a, b) => b.x - a.x)[0].x + 1
        let maxY = data.sort((a, b) => b.y - a.y)[0].y + 1

        let grid = new Array(maxY).fill(0).map(x => new Array(maxX))

        data.forEach(x => grid[x.y][x.x] = [x.used, x.size])

        return grid
    }
    // visualizeGrid = (grid) => {
    //     console.log(
    //         grid.map(x => x.map(y => `${y[0]}/${y[1]}`.padStart(7, ' ')).join(' - '))
    //             .join('\r\n')
    //     )
    // }

    let grid = constructGrid(data)
    // visualizeGrid(grid)

    return null
}

parse = (data) => {
    const regex = /.*x(\d{1,})\-y(\d{1,}).*\s(\d{1,})T.*\s(\d{1,})T.*\s(\d{1,})T.*\s(\d{1,})\%/;
    return data.split('\r\n')
               .slice(2)
               .map(x => regex.exec(x))
               .map(x => {
                    return {
                        x:parseInt(x[1]), 
                        y:parseInt(x[2]), 
                        size:parseInt(x[3]), 
                        used:parseInt(x[4]), 
                        avail:parseInt(x[5]), 
                        percentage:parseInt(x[6])
                    }
                });
}

isValidPair = (a, b) => {
    return a.used !== 0
           && (a.x !== b.x || a.y !== b.y)
           && a.used <= b.avail
}

main = async () => {
    if (!Array.prototype.last) {
        Array.prototype.last = function() {
            return this[this.length - 1]
        }
    }

    await fs.readFile('./22.txt', 'utf8', async (err, data) => {
        data = parse(data)

        console.log('part 1:', measure(() => p1(structuredClone(data))));
        console.log('part 2:', measure(() => p2(structuredClone(data))));
    });
}

measure = (fn) => {
    const start = performance.now();
    let result = fn();
    const end = performance.now();

    return `${result} (${Math.round((end - start) * 10000) / 10000} ms)`;
}

main();

/* PYTHON
import re #, os

# read nodes in a dictionary
d_nodes = {}
with open("input.txt", 'r') as f:
    for line in f:
        if line[0] != '/':
            continue
        x, y, size, used, avail, perc = map(int, re.findall(r'\d+', line))
        d_nodes[(x, y)] = {'used': used, 'avail': avail}

lx = max([val[0] for val in d_nodes.keys()])+1
ly = max([val[1] for val in d_nodes.keys()])+1

# puzzle1 - count viable pairs
cnt = 0
vals = list(d_nodes.values())
for i in range(len(vals)):
    for j in range(i+1, len(vals)):
        if vals[i]['used'] != 0 and vals[i]['used'] <= vals[j]['avail']:
            cnt += 1 
        if vals[j]['used'] != 0 and vals[j]['used'] <= vals[i]['avail']:
            cnt += 1
print(cnt)

def print_map(path = []):
    for y in range(ly):
        for x in range(lx):
            if (x, y) == goal:
                c = '{}'
            elif (x, y) == start:
                c = '[]'
            elif (x, y) == empty:
                c = '__'
            elif (x, y) in path:
                c = '()'
            else:
                c = '..' if d_nodes[(x, y)]['used'] < 100  else '##'
            print(c, end='')
        print("")
    print("")
    

def find_path(start, end, obst=None):
    # reset BFS
    for value in d_nodes.values():
        value['dist'] = float('inf')
        value['prev'] = None
    # do the actual BFS
    queue = [start]
    d_nodes[start]['dist'] = 0
    while len(queue) > 0:
        n = queue.pop(0)
        for x, y in [(n[0]+1, n[1]), (n[0]-1, n[1]), (n[0], n[1]+1), (n[0], n[1]-1)]:
            if 0<=x<lx and 0<=y<ly and d_nodes[(x,y)]['used'] < 100 and (x, y) != obst:
                if d_nodes[(x, y)]['dist'] > d_nodes[n]['dist'] + 1:
                    d_nodes[(x, y)]['dist'] = d_nodes[n]['dist'] + 1
                    d_nodes[(x, y)]['prev'] = n
                    queue.append((x, y))
                if (x, y) == end:
                    path = [(x, y)]
                    while d_nodes[path[-1]]['prev'] != None:
                        path.append(d_nodes[path[-1]]['prev'])
                    return path[-2::-1] # reverse, don't include start



start = (0, 0)
goal = (lx-1, 0)
empty = (None, None)
for key in d_nodes:
    if d_nodes[key]['used'] == 0:
        empty = key
        break
# algorithm (S = start, G = goal)
# 1. find shortest path pGS from G to S
# 2. find shortest path p_ from _ to pG[0]
# 3. cnt += len(p_) + 1 (+1 is for swapping G <-> _ in the next step)
# 4. _ = G, G = pG.pop(0)
# 5. repeat until G = S
pathGS = find_path(goal, start)
cnt = 0
while goal != start:
    path_ = find_path(empty, pathGS.pop(0), obst=goal)
    cnt += len(path_) + 1
    # while len(path_) > 1:
    #     os.system('clear')
    #     empty = path_.pop(0)
    #     print_map(path_)
    #     input()
    empty = goal
    goal = path_[-1]
    # os.system('clear')
    # print_map()
    # input()
print(cnt)
*/