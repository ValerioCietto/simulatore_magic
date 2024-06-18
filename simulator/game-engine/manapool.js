class ManaPool {
  constructor() {
    this.white = 0;
    this.blue = 0;
    this.red = 0;
    this.black = 0;
    this.green = 0;
    this.colorless = 0;
  }

  addMana(mana) {
    this.white += mana.white || 0;
    this.blue += mana.blue || 0;
    this.red += mana.red || 0;
    this.black += mana.black || 0;
    this.green += mana.green || 0;
    this.colorless += mana.colorless || 0;
  }

  spendMana(mana) {
    if (this.canSpendMana(mana)) {
      this.white -= mana.white || 0;
      this.blue -= mana.blue || 0;
      this.red -= mana.red || 0;
      this.black -= mana.black || 0;
      this.green -= mana.green || 0;
      this.colorless -= mana.colorless || 0;
      return true;
    }
    return false;
  }

  canSpendMana(mana) {
    return (
      this.white >= (mana.white || 0) &&
      this.blue >= (mana.blue || 0) &&
      this.red >= (mana.red || 0) &&
      this.black >= (mana.black || 0) &&
      this.green >= (mana.green || 0) &&
      this.colorless >= (mana.colorless || 0)
    );
  }

  parseManaCost(cost) {
    const mana = {
      white: 0,
      blue: 0,
      red: 0,
      black: 0,
      green: 0,
      colorless: 0,
    };

    // Match all instances of mana symbols
    const matches = cost.match(/\{[0-9WUBRG]*\}/g) || [];
    matches.forEach((symbol) => {
      if (symbol.includes("W")) mana.white++;
      else if (symbol.includes("U")) mana.blue++;
      else if (symbol.includes("B")) mana.black++;
      else if (symbol.includes("R")) mana.red++;
      else if (symbol.includes("G")) mana.green++;
      else {
        // It's a number, so this is generic mana
        const number = parseInt(symbol.match(/\d+/)[0]);
        mana.colorless += number;
      }
    });

    return mana;
  }

  canPayCost(cost) {
    const requiredMana = this.parseManaCost(cost);
    return this.canSpendMana(requiredMana);
  }
}

// Example usage:
const manaPool = new ManaPool();
manaPool.addMana({ green: 2, colorless: 3 }); // Adding some mana to the pool
console.log("Current Mana Pool:", manaPool);

// Check if {1}{G} can be paid
const cost = "{1}{G}";
const canPay = manaPool.canPayCost(cost);
console.log(`Can pay ${cost}:`, canPay);
