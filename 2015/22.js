const spellbook = [
    ['magic missile', 53,  (player, target) => { player.mana -= 53; target.damage(4, 'magic missile') }],
    ['drain',         73,  (player, target) => { player.mana -= 73; target.damage(2, 'drain'); player.hp += 2 }],
    ['shield',        113, (player, target) => { player.mana -= 113; player.effects.push([6, 'shield']) }],
    ['poison',        173, (player, target) => { player.mana -= 173; target.effects.push([6, 'poison']) }],
    ['recharge',      229, (player, target) => { player.mana -= 229; player.effects.push([5, 'recharge']) }],
]

const effects = {
    'shield': (target) => { target.armor += 7 },
    'poison': (target) => { target.damage(3, 'poison') },
    'recharge': (target) => { target.mana += 101 }
}

class fighter {
    constructor(name, hp, dmg, armor, mana, effects) {
        this.name = name;
        this.hp = hp;
        this.dmg = dmg;
        this._dmg = dmg;
        this.armor = armor;
        this._armor = armor;
        this.mana = mana;
        this.effects = effects;
    }

    damage(amount, source) {
        this.hp -= amount
        // console.log(`${this.name} took ${amount} damage from ${source}; ${this.hp} health remaining; effects: ${this.effects}`)
    }

    resetToBase() {
        this.dmg = this._dmg
        this.armor = this._armor
    }

    applyEffects() {
        this.resetToBase();

        for (let i = 0; i < this.effects.length; i++) {
            effects[this.effects[i][1]](this)
            this.effects[i][0] -= 1
        }

        this.effects = this.effects.filter(x => x[0] > 0)
    }

    clone() {
        this.resetToBase()
        return new fighter(this.name, this.hp, this.dmg, this.armor, this.mana, structuredClone(this.effects))
    }
}

p1 = (player, boss) => {
    let winningSpells = [['infinity', Number.POSITIVE_INFINITY]];

    fight(player, boss, [], winningSpells, false)

    console.log(winningSpells)

    return winningSpells.reduce((p, c) => p + c[1], 0);
}

p2 = (player, boss) => {
    let winningSpells = [['infinity', Number.POSITIVE_INFINITY]];

    fight(player, boss, [], winningSpells, true)

    console.log(winningSpells)

    return winningSpells.reduce((p, c) => p + c[1], 0);
}

determineEligibleSpells = (spellbook, player, target) => {
    const activeEffects = [...player.effects.map(x => x[1]), ...target.effects.map(x => x[1])]
    return spellbook.filter(x => activeEffects.indexOf(x[0]) === -1).filter(x => x[1] <= player.mana)
}

fight = (player, target, history, winningSpells, hardMode) => {
    if (history.reduce((p, c) => p + c[1], 0) > winningSpells.reduce((p, c) => p + c[1], 0))
        return;

    if (hardMode) {
        player.damage(1, 'hard mode')

        if (player.hp <= 0) {
            return;
        }
    }

    player.applyEffects()
    target.applyEffects()

    const eligibleSpells = determineEligibleSpells(spellbook, player, target)

    for (let i = 0; i < eligibleSpells.length; i++) {
        let newPlayer = player.clone();
        let newTarget = target.clone();
        let newHistory = structuredClone(history)
        
        // console.log(`player casts ${eligibleSpells[i][0]}`)

        eligibleSpells[i][2](newPlayer, newTarget);
        newHistory.push([eligibleSpells[i][0], eligibleSpells[i][1]])

        if (newTarget.hp <= 0) {
            if (newHistory.reduce((p, c) => p + c[1], 0) < winningSpells.reduce((p, c) => p + c[1], 0)) {
                winningSpells.length = 0;
                winningSpells.push(...newHistory)
            }
            continue;
        }

        // console.log('BOSS TURN')

        newPlayer.applyEffects()
        newTarget.applyEffects()

        if (newTarget.hp <= 0) {
            if (newHistory.reduce((p, c) => p + c[1], 0) < winningSpells.reduce((p, c) => p + c[1], 0)) {
                winningSpells.length = 0;
                winningSpells.push(...newHistory)
            }
            continue;
        }

        newPlayer.damage(Math.max(newTarget.dmg - newPlayer.armor, 1), 'attack');

        if (newPlayer.hp <= 0) {
            continue;
        }

        fight(newPlayer, newTarget, newHistory, winningSpells, hardMode)
    }
}

main = () => {
    const boss = new fighter('boss', 55, 8, 0, 0, []);
    const player = new fighter('player', 50, 0, 0, 500, []);

    console.log('part 1:', p1(player.clone(), boss.clone()));
    console.log('part 2:', p2(player.clone(), boss.clone()));
}

main();