// launch with node simulator/sim_combat.js

function combat_1v1() {
  let opponentCreatures;
  let playerCreatures;

  opponentCreatures = [{ power: 1, toughness: 1 }];
  playerCreatures = [{ power: 1, toughness: 1 }];

  function combat(attacking, defending) {
    // 1 attacking wins
    // 0 no change
    // -1 defending wins
    let result = 0;
    if (attacking.power >= defending.toughness) {
      result++;
    }
    if (defending.power >= attacking.toughness) {
      result--;
    }
    return result;
  }
  console.log("1/1 vs 1/1");
  console.log(combat({ power: 1, toughness: 1 }, { power: 1, toughness: 1 }));

  console.log("0 power");
  console.log(combat({ power: 0, toughness: 1 }, { power: 0, toughness: 1 }));
  console.log("1/2 vs 2/1");
  console.log(combat({ power: 1, toughness: 2 }, { power: 2, toughness: 1 }));

  console.log("2/3 vs 2/2");
  console.log(combat({ power: 2, toughness: 3 }, { power: 2, toughness: 2 }));

  console.log("2/2 vs 2/1");
  console.log(combat({ power: 2, toughness: 2 }, { power: 2, toughness: 1 }));

  console.log("2/2 vs 2/3");
  console.log(combat({ power: 2, toughness: 2 }, { power: 2, toughness: 3 }));
}

combat_1v1();
