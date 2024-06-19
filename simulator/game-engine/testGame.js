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
  console.log(game.totalDamage);
}
// read file content of decks/Arena Starter Decks/Large and In Charge.txt
const deckString = require("fs").readFileSync(
  "decks/Arena Starter Decks/Aerial Domination.txt",
  "utf8"
);
const game = new Game(deckString);
game.start();

printGame(game);
game.playTurn();
printGame(game);
game.playTurn();
printGame(game);
game.playTurn();
printGame(game);
game.playTurn();
printGame(game);
game.playTurn();
printGame(game);
game.playTurn();
printGame(game);
game.playTurn();
printGame(game);
game.playTurn();
printGame(game);
game.playTurn();
