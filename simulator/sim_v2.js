// launch with node simulator/sim_v2.js

const deck = [
    {name: 'willow elf', power: 1, toughness: 1, cost: 1},
    {name: 'cylian elf', power: 2, toughness: 2, cost: 2},
    {name: 'trained armodon', power: 3, toughness: 3, cost: 3},
    {name: 'ferocius zheng', power: 4, toughness: 4, cost: 4},
    {name: 'hollowhenge beast', power: 5, toughness: 5, cost: 5},
    {name: 'cowl prowler', power: 6, toughness: 6, cost: 6},
    {name: 'enormous baloth', power: 7, toughness: 7, cost: 7},
    {name: 'Forest'},
    {name: 'Forest'},
    {name: 'Forest'},
    {name: 'Forest'},
    {name: 'Forest'},
    {name: 'Forest'},
    {name: 'Forest'},
  ];
const { cards } = require('./cards.js');
// Custom Card Objects


let battlefield = []
// Starting Hand
let hand = [];

let opponentLifePoints = 20

// Shuffle the Deck
shuffleDeck(deck);

// Draw 7 Cards
drawCards(7);

// Function to simulate playing a turn
function playTurn() {
    // Perform actions for the turn
    console.log('Playing a turn...');
    // Starting Phases
    removeSummonSickness();
    untapPhase();
    drawPhase();
    mainPhase();
    main2Phase();
    combatPhase();

    endPhase();
}



// Function to Shuffle the Deck
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// Function to Draw Cards
function drawCards(numCards) {
    for (let i = 0; i < numCards; i++) {
        const drawnCard = deck.pop();
        hand.push(drawnCard);
    }
}

// Untap Phase
function untapPhase() {
    // console.log('Untap Phase: Untapping all permanents.');
    // Untap all permanents on the battlefield
    
}

// Draw Phase
function drawPhase() {
    // console.log('Draw Phase: Drawing a card.');
    const drawnCard = deck.pop();
    hand.push(drawnCard);
    // console.log(`Drawn Card: ${drawnCard}`);
    // console.log('Current Hand:', hand);
}

// Main Phase
function mainPhase() {
    // console.log('Main Phase: Playing a land from the hand (if available).');
    playLand()
    // console.log('battlefield:', battlefield);
}

// Main Phase 2
function main2Phase() {
    // console.log('Main Phase 2: Playing creatures from the hand (if available).');
    // Play creatures by paying their costs and tapping lands
    let mana = countLands()
    let creature = findMaxCostCreature(mana)
    if(creature !== null){
        console.log(creature)
        playPermanentByName(creature.name)
        // console.log('battlefield:', battlefield);
    }else{
        // console.log('No creature to play')
    }


}

// Combat Phase
function combatPhase() {
    // console.log('Combat Phase: Attacking with creatures (if available).');
    // Attack with creatures and deal damage to the opponent
    let damage_max = calculateTotalPower()
    // console.log('attack damage:' + damage_max)
    opponentLifePoints -= damage_max

}

// End Phase
function endPhase() {
    // console.log('End Phase: Calculating damage dealt to the opponent.');
    // Calculate damage dealt to the opponent
    // console.log('');
    // console.log('');
    // console.log('');
}

// Function to remove summon_sickness attribute from all cards in the battlefield
function removeSummonSickness() {
    battlefield.forEach(card => {
      if (card.hasOwnProperty('summon_sickness')) {
        delete card.summon_sickness;
      }
    });
  }

// Function to find the most expensive creature in hand within the available mana
function findMaxCostCreature(availableMana) {
    let maxCostCreature = null;
  
    hand.forEach(card => {
      if (card.hasOwnProperty('cost') && card.cost <= availableMana && (maxCostCreature === null || card.cost > maxCostCreature.cost)) {
        maxCostCreature = card;
      }
    });
  
    return maxCostCreature;
  }

// Function to play a permanent from the hand to the battlefield
function playPermanent(cardName) {
    const cardIndex = hand.findIndex(card => card === cardName);

    if (cardIndex !== -1) {
        const playedCard = hand.splice(cardIndex, 1)[0];
        battlefield.push(playedCard);
        // console.log(`Played ${playedCard} onto the battlefield.`);
    } else {
        // console.log(`Card ${cardName} not found in hand.`);
    }
}

// Function to play a permanent from the hand to the battlefield
function playPermanentByName(cardName) {
    const cardIndex = hand.findIndex(card => card.name === cardName);

    if (cardIndex !== -1) {
        const playedCard = hand.splice(cardIndex, 1)[0];
        playedCard.summon_sickness = true;
        battlefield.push(playedCard);
        // console.log(`Played ${playedCard.name} onto the battlefield.`);
    } else {
        // console.log(`Card ${cardName} not found in hand.`);
    }
}

// Function to find and play a land card from the hand
function playLand() {
    const landIndex = hand.findIndex(card => card.name === 'Forest');
  
    if (landIndex !== -1) {
      playPermanent(hand[landIndex]);
    } else {
      // console.log('No Forest card found in hand.');
    }
}

// Function to count the number of land cards in the battlefield
function countLands() {
    let landCount = 0;
  
    battlefield.forEach(card => {
      const landTypes = ['Wastes', 'Forest', 'Island', 'Mountain', 'Plains'];
      if (landTypes.includes(card.name)) {
        landCount++;
      }
    });
  
    return landCount;
  }

function calculateTotalPower() {
let totalPower = 0;

battlefield.forEach(card => {
    if (card.hasOwnProperty('power') && !card.hasOwnProperty('summon_sickness')) {
    totalPower += card.power;
    }
});

return totalPower;
}

// Function to play the game

function playGame() {
    let turns = 0

    while (deck.length > 0) {
        turns++;
        if (deck.length === 0) {
            console.log(`You ran out of cards in your deck. Game over in ${turns} turns.`);
            break;
        }
        playTurn();
        if (opponentLifePoints <= 0) {
            console.log(`Congratulations! You beat the opponent in ${turns} turns.`);
            break;
        }

    }

    
}
playGame()