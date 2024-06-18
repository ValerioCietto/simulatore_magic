// launch with node simulator/fetch_alchemy.js

const axios = require("axios");
// require fs
const fs = require("fs");

async function getCardData() {
  try {
    const response = await axios.get(
      `https://api.scryfall.com/cards/search?q=f:alchemy`
    );
    return response;
  } catch (error) {
    console.log(`Error retrieving card data: ${error.message}`);
    return null;
  }
}

async function getCardDataNext(query) {
  try {
    const response = await axios.get(query);
    return response;
  } catch (error) {
    console.log(`Error retrieving card data: ${error.message}`);
    return null;
  }
}

async function main() {
  let cards = {};
  if (fs.existsSync("cards/cards.json")) {
    console.log("File exists");
    const data = await fs.readFileSync("cards/cards.json", "utf8");
    cards = JSON.parse(data);
    // map filter
    cards = cards.map((card) => {
      let returnedObject = {};
      returnedObject["name"] = card.name;
      returnedObject["power"] = card.power;
      returnedObject["toughness"] = card.toughness;
      returnedObject["cmc"] = card.cmc;
      returnedObject["mana_cost"] = card.mana_cost;
      returnedObject["type_line"] = card.type_line;
      returnedObject["oracle_text"] = card.oracle_text + "\n";
      // replace every instance of name of the card in oracle text with tilde ( ~ )
      returnedObject["oracle_text"] = returnedObject["oracle_text"].replace(
        new RegExp(card.name, "g"),
        "~"
      );
      returnedObject["image_uris"] = card.image_uris;
      returnedObject["price"] = card.prices["usd"];
      returnedObject["colors"] = card.colors;
      returnedObject["color_identity"] = card.color_identity;
      returnedObject["set"] = card.set;
      returnedObject["rarity"] = card.rarity;
      return returnedObject;
    });
    console.log(cards);
    fs.writeFileSync("cards/cardsAlchemy.json", JSON.stringify(cards));
  } else {
    let response = await getCardData();
    let cardList = response.data.data;
    console.log(response.data.has_more);
    while (response.data.has_more) {
      console.log(response.data.next_page);
      // add response.data to cardList
      response = await getCardDataNext(response.data.next_page);
      // add response.data.data to cardList
      cardList = [...cardList, ...response.data.data];
    }
    // save cardList to a file named "cards.json" in folder "cards"
    fs.writeFileSync("cards/cards.json", JSON.stringify(cardList));
  }

  // console.log(cards);
}
main();
