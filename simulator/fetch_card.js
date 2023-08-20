// launch with node simulator/fetch_card.js

const axios = require("axios");

async function getCardData(cardName) {
  try {
    const response = await axios.get(
      `https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(
        cardName
      )}`
    );
    return response.data;
  } catch (error) {
    console.log(`Error retrieving card data: ${error.message}`);
    return null;
  }
}

function formatCardData(data) {
  const card = {
    name: data.name,
    cost: data.mana_cost,
    type_line: data.type_line,
    oracle_text: data.oracle_text,
  };
  if (data.power > 0) {
    card.power = data.power;
  }
  if (data.toughness > 0) {
    card.toughness = data.toughness;
  }
  card.image = data.image_uris.small;

  return card;
}

async function main() {
  const card = await getCardData("trained armodon");
  console.log(formatCardData(card));
  const card1 = await getCardData("forest");
  console.log(formatCardData(card1));
  const card2 = await getCardData("Matter Reshaper");
  console.log(card2);
}
main();
