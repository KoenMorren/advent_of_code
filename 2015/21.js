const player = {
    hp: 100,
    dmg: 0,
    armor: 0
}

const shop = {
    weapons: [
        ['Dagger',      8, 4, 0],
        ['Shortsword', 10, 5, 0],
        ['Warhammer',  25, 6, 0],
        ['Longsword',  40, 7, 0],
        ['Greataxe',   74, 8, 0]
    ],
    armor: [
        ['Leather',      13, 0, 1],
        ['Chainmail',    31, 0, 2],
        ['Splintmail',   53, 0, 3],
        ['Bandedmail',   75, 0, 4],
        ['Platemail',   102, 0, 5]
    ],
    rings: [
        ['Damage +1',    25, 1, 0],
        ['Damage +2',    50, 2, 0],
        ['Damage +3',   100, 3, 0],
        ['Defense +1',   20, 0, 1],
        ['Defense +2',   40, 0, 2],
        ['Defense +3',   80, 0, 3]
    ]
}

p1 = (boss, loadouts) => {
    return loadouts.filter(equipment => {
        let playerIteration = structuredClone(player);
        playerIteration.dmg += equipment.reduce((p, c) => p + c[2], 0);
        playerIteration.armor += equipment.reduce((p, c) => p + c[3], 0);

        return canDefeatBoss(playerIteration, boss)
    })
    .map(x => x.reduce((p, c) => p + c[1], 0))
    .sort((a, b) => a - b)
    [0]
}

p2 = (boss, loadouts) => {
    return loadouts.filter(equipment => {
        let playerIteration = structuredClone(player);
        playerIteration.dmg += equipment.reduce((p, c) => p + c[2], 0);
        playerIteration.armor += equipment.reduce((p, c) => p + c[3], 0);

        return !canDefeatBoss(playerIteration, boss)
    })
    .map(x => x.reduce((p, c) => p + c[1], 0))
    .sort((a, b) => b - a)
    [0]
}

buyEquipment = (shop) => {
    // must buy weapon
    // armor is optional
    // 0 - 2 rings

    let loadouts = [];

    for (let i = 0; i < shop.weapons.length; i++) {
        let equipment = [shop.weapons[i]];
        
        buyArmor(shop, equipment, loadouts)
    }

    return loadouts;
}

buyArmor = (shop, equipment, loadouts) => {
    for (let j = -1; j < shop.armor.length; j++) {
        let newEquipment = structuredClone(equipment)

        if (j > -1) 
            newEquipment.push(shop.armor[j])

        buyRings(shop, structuredClone(newEquipment), loadouts)
    }
}

buyRings = (shop, equipment, loadouts) => {
    for (let i = -1; i < shop.rings.length; i++) {
        let newEquipment = structuredClone(equipment)

        if (i > -1) {
            newEquipment.push(shop.rings[i])
            for (let j = i; j < shop.rings.length; j++) {
                let secondRing = structuredClone(newEquipment);

                if (j > i)
                    secondRing.push(shop.rings[j])

                loadouts.push(secondRing)
            }
        }
    }
}

calcDamage = (attacker, target) => {
    return Math.max(attacker.dmg - target.armor, 1)
}

canDefeatBoss = (player, boss) => {
    let playerHP = player.hp;
    let playerDamage = calcDamage(player, boss);
    let bossHP = boss.hp;
    let bossDamage = calcDamage(boss, player);

    let isPlayerAttacking = true;

    while (playerHP > 0 && bossHP > 0) {
        if (isPlayerAttacking) {
            bossHP -= playerDamage;
            // console.log('The player deals ' + calcDamage(player, boss) + ' damage, the boss is down to ' + bossHP);
        } else {
            playerHP -= bossDamage;
            // console.log('The boss deals ' + calcDamage(boss, player) + ' damage, the player is down to ' + playerHP);
        }

        isPlayerAttacking = !isPlayerAttacking
    }

    return playerHP > 0
}

main = () => {
    const boss = {
        hp: 100,
        dmg: 8,
        armor: 2
    }

    const loadouts = buyEquipment(shop);

    console.log('part 1:', measure(() => p1(boss, loadouts)))
    console.log('part 2:', measure(() => p2(boss, loadouts)))


    // console.log(
    //     canDefeatBoss(
    //         { hp: 8, dmg: 5, armor: 5 },
    //         { hp: 12, dmg: 7, armor: 2 }
    //     )
    // )
}

measure = (fn) => {
    const start = performance.now();
    let result = fn();
    const end = performance.now();

    return `${result} (${Math.round((end - start) * 10000) / 10000} ms)`;
}

main();