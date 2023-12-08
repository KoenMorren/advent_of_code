const fs = require('fs');
 
const values = {
    'A': 14, 
    'K': 13, 
    'Q': 12, 
    'J': 11, 
    'T': 10, 
    '9': 9, 
    '8': 8, 
    '7': 7, 
    '6': 6, 
    '5': 5, 
    '4': 4, 
    '3': 3, 
    '2': 2
}
 
const hands = {
    'five-of-a-kind': 6,
    'four-of-a-kind': 5,
    'full-house': 4,
    'three-of-a-kind': 3,
    'two-pair': 2,
    'one-pair': 1,
    'high-card': 0
}
 
p1 = async () => {
    await fs.readFile('./7_input.txt', 'utf8', (err, data) => {
        data = data.split('\n');
 
        const result = data.map(x => x.split(' '))
                           .map(x => determineHandWithoutJoker(x))
                           .sort(sortHands)
                           .map((x, i) => parseInt(x[1]) * (i + 1))
                           .reduce((p, c) => p + c, 0);
 
        console.log("Part 1", result);
    });
};
 
p2 = async () => {
    await fs.readFile('./7_input.txt', 'utf8', (err, data) => {
        data = data.split('\n');

        const file = JSON.stringify(data.map(x => x.split(' '))
        .map(x => determineHandWithJoker(x))
        .sort(sortHands), null, 4)

        fs.writeFile('./7_output.txt', file, err => {
            if (err) {
              console.error(err);
            }
            // file written successfully
          });
 
        const result = data.map(x => x.split(' '))
                           .map(x => determineHandWithJoker(x))
                           .sort(sortHands)
                           .map((x, i) => parseInt(x[1]) * (i + 1))
                           .reduce((p, c) => p + c, 0);
 
        console.log("Part 2", result);
    });
};
 
determineHandWithoutJoker = (hand) => {
    var cards = determineCards(hand[0])
 
    return determineHand(hand, cards);
}
 
determineHandWithJoker = (hand) => {
    var cards = determineCards(hand[0])
 
    if (Object.keys(cards).indexOf('J') === -1
        || (Object.keys(cards).length === 1 && Object.keys(cards)[0] === 'J'))
        return determineHand(hand, cards)
 
    let mostOfCard = '';
    let amountOfCard = 0;
    Object.keys(cards).forEach(x => {
        if (x !== 'J' && cards[x] > amountOfCard) {
            amountOfCard = cards[x]
            mostOfCard = x
        }
    })
 
    var newCards = {...cards};
    newCards[mostOfCard] = amountOfCard + cards['J']
    delete newCards.J;
 
    return determineHand(hand, newCards)
}
 
determineCards = (cards) => {
    return cards.split('').reduce((p, c) => {
        if (!p[c])
            p[c] = 1
        else 
            p[c] += 1
 
        return p
    }, {})
}
 
determineHand = (hand, cards) => {
    if (Object.keys(cards).length === 1)
        return [...hand, 'five-of-a-kind']
    if (Object.keys(cards).length === 2) {
        if (cards[Object.keys(cards)[0]] === 1 || cards[Object.keys(cards)[0]] === 4)
            return [...hand, 'four-of-a-kind']
        return [...hand, 'full-house']
    }
    if (Object.keys(cards).length === 3) {
        if (cards[Object.keys(cards)[0]] === 2 || cards[Object.keys(cards)[1]] === 2)
            return [...hand, 'two-pair']
        return [...hand, 'three-of-a-kind']
    }
    if (Object.keys(cards).length === 4)
        return [...hand, 'one-pair']
    if (Object.keys(cards).length === 5)
        return [...hand, 'high-card']
}
 
sortHands = (hand1, hand2) => {
    const hand1Value = hands[hand1[2]]
    const hand2Value = hands[hand2[2]]
 
    if (hand1Value !== hand2Value)
        return hand1Value - hand2Value
 
    for(let i = 0; i < 5; i++) {
        if (values[hand1[0][i]] !== values[hand2[0][i]])
            return values[hand1[0][i]] - values[hand2[0][i]]
    }
 
    return 0
}
 
main = async () => {
    await p1();
    await p2();
}
 
main();