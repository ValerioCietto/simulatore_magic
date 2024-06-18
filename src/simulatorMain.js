// launch with node src/simulatorMain.js

const Game = require("../simulator/game-engine/game");

console.log("Starting simulation...");
const deckString = `4 Toadstool Admirer
4 Cankerbloom
4 Woodland Mystic
4 Burrowing Razormaw
4 Hulking Raptor
4 Gigantosaurus
4 Earthshaker Dreadmaw
4 Nurturing Bristleback
28 Forest`;

const deckString1 = `32 Slime Against Humanity
28 Forest`;
// 21 terre
for (let j = 16; j < 24; j++) {
  const numberOfLands = j;
  const numberOfSlimes = 60 - numberOfLands;

  const decklist =
    "" +
    numberOfSlimes +
    " Slime Against Humanity\n" +
    numberOfLands +
    " Forest";
  console.log(decklist);
  const turns = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (let index = 0; index < 1000; index++) {
    if (index % 1000 == 0) {
      console.log("index                    ", index);
    }
    const turnsToWin = getTurnsToWin(decklist);
    //console.log("TURNS TO WIN", turnsToWin);
    turns[turnsToWin] = Number(turns[turnsToWin]) + 1;
  }
  console.log(turns);
}

function getTurnsToWin(deckString) {
  const game = new Game(deckString);
  game.start();
  const maxTurns = 12;
  while (game.totalDamage < 21 && game.turnsCounter < maxTurns) {
    game.playTurn();
  }
  return game.turnsCounter;
}
