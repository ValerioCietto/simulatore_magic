class battlefield {
  constructor() {
    this.cards = [];
  }

  addCard(card) {
    this.cards.push(card);
  }

  getCards() {
    return this.cards;
  }
}

module.exports = battlefield;
