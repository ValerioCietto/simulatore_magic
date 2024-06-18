// launch with node simulator/fetch_alchemy.js

const axios = require("axios");
// require fs
const fs = require("fs");

async function getCardData(cardName) {
  try {
    const response = await axios.get(
      `https://api.scryfall.com/cards/search?q=f:timeless`
    );
    return response.data;
  } catch (error) {
    console.log(`Error retrieving card data: ${error.message}`);
    return null;
  }
}

async function main() {
  let cards = {};
  if (fs.existsSync("cards/cardsTimeless.json")) {
    console.log("File exists");
    const data = await fs.readFileSync("cards/cardsTimeless.json", "utf8");
    cards = JSON.parse(data);
    // map filter
    cards = cards.data.map((card) => {
      let returnedObject = {};
      returnedObject["name"] = card.name;
      returnedObject["power"] = card.power;
      returnedObject["toughness"] = card.toughness;
      returnedObject["cmc"] = card.cmc;
      returnedObject["mana_cost"] = card.mana_cost;
      returnedObject["type_line"] = card.type_line;
      returnedObject["oracle_text"] = card.oracle_text;
      returnedObject["image_uris"] = card.image_uris;
      returnedObject["price"] = card.prices["usd"];
      returnedObject["colors"] = card.colors;
      returnedObject["color_identity"] = card.color_identity;
      returnedObject["set"] = card.set;
      returnedObject["rarity"] = card.rarity;
      return returnedObject;
    });
    console.log(cards);
    fs.writeFileSync(
      "cards/cardsTimelesssFormatted.json",
      JSON.stringify(cards)
    );
  } else {
    const cardList = await getCardData();
    // save cardList to a file named "cards.json" in folder "cards"
    fs.writeFileSync("cards/cardsTimeless.json", JSON.stringify(cardList));
  }

  // console.log(cards);
}
main();
