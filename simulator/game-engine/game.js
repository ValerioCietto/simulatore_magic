// this is a game module
// a game has a deck

const Deck = require("./deck.js");
const Hand = require("./hand.js");
const Battlefield = require("./battlefield.js");

class Game {
  constructor(decklist) {
    const deck = new Deck();
    const hand = new Hand();
    const battlefield = new Battlefield();
    const graveyard = new Battlefield();
    deck.importFromDeckString(decklist);
    this.deck = deck;
    this.hand = hand;
    this.battlefield = battlefield;
    this.graveyard = graveyard;
    this.deck.importCardData();
    this.turnsCounter = 0;
    this.totalDamage = 0;
  }

  drawCard() {
    this.hand.addCard(this.deck.draw(1)[0]);
  }

  drawStartingHand() {
    this.hand.addCards(this.deck.draw(7));
  }

  start() {
    this.deck.shuffle();
    this.drawStartingHand();
  }

  playTurn() {
    this.turnsCounter += 1;
    this.cancelSummonSickness();
    this.drawCard();
    this.playLand();
    const mana = this.checkAvailableMana();
    this.playCardWithBudget(mana);
    this.playCombat();
  }

  cancelSummonSickness() {
    this.battlefield.cards.forEach((card) => {
      if (card.summon_sickness) {
        // delete the key summon_sickness
        delete card.summon_sickness;
      }
    });
  }

  playCombat() {
    if (this.battlefield.cards.length > 0) {
      // for every creature card without summon_sickness, sum all powers
      let totalPower = 0;
      this.battlefield.cards.forEach((card) => {
        if (card.type_line.includes("Creature")) {
          if (!card.summon_sickness) {
            totalPower += Number(card.power);
          }
        }
      });
      this.totalDamage += totalPower;
    }
  }

  playLand() {
    const landIndex = this.hand.cards.findIndex(
      (card) => card.name === "Forest"
    );
    if (landIndex !== -1) {
      this.battlefield.cards.push(this.hand.cards[landIndex]);
      this.hand.removeCard(landIndex);
    }
  }

  checkAvailableMana() {
    let manaAvailable = 0;
    // foreach card in battlefield
    this.battlefield.cards.forEach((card) => {
      if (card.name === "Forest") {
        manaAvailable += 1;
      }
      if (card.name === "Woodland Mystic") {
        manaAvailable += 1;
      }
      if (card.name === "Hulking Raptor") {
        manaAvailable += 2;
      }
    });
    return manaAvailable;
  }

  playCardWithBudget(mana) {
    // sort cards by mana cost descending
    this.hand.cards.sort((a, b) => b.cmc - a.cmc);

    // for each card in hand
    const cardIndex = this.hand.cards.findIndex(
      (card) => card.cmc <= mana && !card.type_line.includes("Land")
    );
    // print whole hand with name and cost
    // console.table(
    //   this.hand.cards.map((card) => ({
    //     name: card.name,
    //     manaCost: card.cmc,
    //   }))
    // );

    if (cardIndex !== -1) {
      if (this.hand.cards[cardIndex].name === "Nurturing Bristleback") {
        this.battlefield.cards.push({
          name: "Dinosaur",
          type_line: "Creature - Dinosaur",
          power: 3,
          thoughness: 3,
          token: true,
          summon_sickness: true,
        });
      }
      if (this.hand.cards[cardIndex].name === "Slime Against Humanity") {
        this.battlefield.cards.push({
          name: "Ooze",
          type_line: "Creature - Ooze",
          power: 1,
          thoughness: 1,
          token: true,
          summon_sickness: true,
        });
      }
      if (this.hand.cards[cardIndex].type_line.includes("Creature")) {
        this.battlefield.cards.push(this.hand.cards[cardIndex]);
        // add attribute summon_sickness to the newly played card
        this.battlefield.cards[
          this.battlefield.cards.length - 1
        ].summon_sickness = true;
      } else if (this.hand.cards[cardIndex].type_line.includes("Sorcery")) {
        this.graveyard.cards.push(this.hand.cards[cardIndex]);
      }

      this.hand.cards.splice(cardIndex, 1);
    }
  }
}

module.exports = Game;
