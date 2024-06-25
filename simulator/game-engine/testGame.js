// run with
// node simulator/game-engine/testGame.js
const Game = require("./game");
function printNestedObject(obj) {
  console.log(JSON.stringify(obj, null, 2));
}
function printGame(game) {
  console.log("turn: ", game.turnsCounter);
  const cardsNamesInBattlefield = game.battlefield.cards
    .map((card) => {
      return card.name;
    })
    .join(", ");
  console.log(cardsNamesInBattlefield);
  const cardsNamesInHand = game.hand.cards
    .map((card) => {
      return card.name;
    })
    .join(", ");
  console.log(cardsNamesInHand);
  console.log("Damage: ", game.totalDamage);
}
// read file content of decks/Arena Starter Decks/Large and In Charge.txt
const deckStringBlack = require("fs").readFileSync(
  "decks/Arena Starter Decks/Cold-Blooded Killers.txt",
  "utf8"
);
const deckStringBlue = require("fs").readFileSync(
  "decks/Arena Starter Decks/Aerial Domination.txt",
  "utf8"
);
const deckStringGreen = require("fs").readFileSync(
  "decks/Arena Starter Decks/Large and In Charge.txt",
  "utf8"
);

const maxTurns = 15;
const turnToWinArray = [
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
];
const numberOfGames = 1000;
for (let index = 0; index < numberOfGames; index++) {
  const game = new Game(deckStringBlack);
  game.start();
  while (game.totalDamage < 21 && game.turnsCounter < maxTurns) {
    game.playTurn();
  }
  console.log("win on turn " + game.turnsCounter);
  // sum as integer in turnToWinArray
  turnToWinArray[game.turnsCounter - 1][0] += 1;
}

console.log(turnToWinArray);
