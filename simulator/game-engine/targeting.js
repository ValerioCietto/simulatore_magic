/**
 * Selects and destroys a creature based on specific criteria: highest power, highest mana cost if tied,
 * and ignoring creatures that are indestructible, have ward, or are marked for sacrifice.
 * @param {Array} creatures - Array of creature objects.
 * @returns {Object|null} The creature that was selected to be destroyed, or null if no eligible creatures.
 */
function selectCreatureToDestroy(creatures) {
  // Filter out creatures that cannot be destroyed based on given criteria
  const eligibleCreatures = creatures.filter(
    (creature) =>
      !creature.isIndestructible &&
      !creature.hasWard &&
      !creature.hasHexproof &&
      !creature.sacrificeAtEndOfTurn
  );

  if (eligibleCreatures.length === 0) {
    console.log("No eligible creatures to destroy.");
    return null; // Return null if there are no creatures that meet the criteria
  }

  // Sort creatures by power descending, then by mana cost descending
  eligibleCreatures.sort((a, b) => {
    if (b.power === a.power) {
      return b.manaCost - a.manaCost; // Sort by mana cost if powers are equal
    }
    return b.power - a.power; // Sort by power
  });

  const creatureToDestroy = eligibleCreatures[0]; // The first creature after sorting is the target
  console.log(
    `Creature selected to destroy: ${creatureToDestroy.name} with power ${creatureToDestroy.power} and mana cost ${creatureToDestroy.manaCost}`
  );
  return creatureToDestroy; // Return the selected creature
}

// Example usage:
const creatures = [
  {
    name: "Goblin Raider",
    power: 2,
    manaCost: 1,
    isIndestructible: false,
    hasWard: false,
    sacrificeAtEndOfTurn: false,
  },
  {
    name: "Elf Mystic",
    power: 3,
    manaCost: 2,
    isIndestructible: true,
    hasWard: false,
    sacrificeAtEndOfTurn: false,
  },
  {
    name: "Dragon Knight",
    power: 4,
    manaCost: 4,
    isIndestructible: false,
    hasWard: false,
    sacrificeAtEndOfTurn: false,
  },
  {
    name: "Silver Paladin",
    power: 4,
    manaCost: 5,
    isIndestructible: false,
    hasWard: false,
    sacrificeAtEndOfTurn: false,
  },
];

const destroyedCreature = selectCreatureToDestroy(creatures);
console.log(creatures); // Optional: Log remaining creatures or other data
