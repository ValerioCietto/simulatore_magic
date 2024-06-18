// interface

const alchemyData = require("../../cards/cardsAlchemy.json");

class Deck {
  constructor() {
    this.cards = [];
    this.cardsData = [];
  }

  importFromDeckString(deckString) {
    let cardLines = deckString.split("\n");
    cardLines.forEach((line) => {
      let count = line.split(" ")[0];
      let name = line.substring(count.length + 1, line.length);
      // do something with count and name
      Array.from({ length: Number(count) }, () => name).forEach((card) =>
        this.cards.push(card)
      );
    });
  }

  importCardData() {
    this.cards.forEach((card) => {
      // search in alchemyData for the card name
      const cardData = alchemyData.find((data) => data.name === card);
      if (cardData) {
        this.cardsData.push(cardData);
      }
    });
  }

  importFromCSV(csv) {
    this.cards = csv.split(",").map((card) => card.trim());
  }

  importFromArena(arenaDeck) {
    // example format
    // deck
    // 20 Forest
    // 1 Llanowar Elves

    const lines = arenaDeck.split("\n");
    // for each line, extract the number, then the card name
    // and add the card name x times in the deck
    for (const line of lines) {
      const [count, ...name] = line.split(" ");
      const cardName = name.join(" ");
      for (let i = 0; i < Number(count); i++) {
        this.cards.push(cardName);
      }
    }
  }

  shuffle() {
    for (let i = this.cardsData.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cardsData[i], this.cardsData[j]] = [
        this.cardsData[j],
        this.cardsData[i],
      ];
    }
  }

  draw(numCards) {
    const drawnCards = [];
    for (let i = 0; i < numCards; i++) {
      drawnCards.push(this.cardsData.pop());
    }
    return drawnCards;
  }

  addCard(card) {
    this.cardsData.push(card);
  }

  getCards() {
    return this.cardsData;
  }

  getCardCount() {
    return this.cardsData.length;
  }

  isEmpty() {
    return this.cardsData.length === 0;
  }

  clear() {
    this.cardsData = [];
  }

  viewTopCard() {
    return this.cardsData[this.cardsData.length - 1];
  }

  viewTopCards(numCards) {
    // returns the top numCards cards in the deck
    const topCards = [];
    for (let i = 0; i < numCards; i++) {
      topCards.push(this.cardsData[this.cardsData.length - 1 - i]);
    }
    return topCards;
  }
}

module.exports = Deck;
