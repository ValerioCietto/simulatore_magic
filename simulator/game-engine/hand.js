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
    var index = this.cards.indexOf(card);
    if (index > -1) {
      this.cards.splice(index, 1);
    }
  }
}

module.exports = Hand;
