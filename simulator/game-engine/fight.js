/**
 * Makes two creatures fight each other, where each deals damage equal to its power to the other.
 * @param {Object} creature1 - The first creature, with properties for power, toughness, and isDestroyed.
 * @param {Object} creature2 - The second creature, similar properties as the first.
 */
function fight(creature1, creature2) {
  console.log(`${creature1.name} fights ${creature2.name}`);

  // Creature 1 deals damage to Creature 2
  creature2.toughness -= creature1.power;
  if (creature2.toughness <= 0) {
    creature2.isDestroyed = true;
    console.log(`${creature2.name} is destroyed in the fight.`);
  }

  // Creature 2 deals damage to Creature 1
  creature1.toughness -= creature2.power;
  if (creature1.toughness <= 0) {
    creature1.isDestroyed = true;
    console.log(`${creature1.name} is destroyed in the fight.`);
  }
}

// Example usage:
const creature1 = {
  name: "Giant Spider",
  power: 4,
  toughness: 4,
  isDestroyed: false,
};

const creature2 = {
  name: "Elven Archer",
  power: 2,
  toughness: 3,
  isDestroyed: false,
};

fight(creature1, creature2);
console.log(creature1); // Check the status of creature1 after the fight
console.log(creature2); // Check the status of creature2 after the fight
