class Hand {
  constructor() {
    this.cards = [];
  }

  addCard(card) {
    this.cards.push(card);
  }

  addCards(cards) {
    this.cards = this.cards.concat(cards);
  }

  getCards() {
    return this.cards;
  }

  removeCard(card) {
    const index = this.cards.indexOf(card);
    if (index > -1) {
      this.cards.splice(index, 1);
    }
  }

  removeCardByName(name) {
    const index = this.cards.findIndex((card) => card.name === name);
    if (index > -1) {
      this.cards.splice(index, 1);
    }
  }
}

module.exports = Hand;
