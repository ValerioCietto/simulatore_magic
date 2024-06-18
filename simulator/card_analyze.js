// launch with node simulator/card_analyze.js

// require fs
const fs = require("fs");
const { type } = require("os");

function getKeyWordsFromOracleText(oracle_text, power) {
  let abilityScore = 0;
  const abilitiesValue = [
    { name: "Deathtouch\n", value: 1 },
    {
      name: "Deathtouch. Toxic 1 (Players dealt combat damage by this creature also get a poison counter.)\n",
      value: 2,
    },
    {
      name: "Menace (This creature can't be blocked except by two or more creatures.)\n",
      value: 1,
    },
    { name: "Flash\n", value: 1 },
    { name: "Flying\n", value: 2 },
    { name: "Flying, deathtouch\n", value: 2 + 2 },
    { name: "Flying, defender\n", value: 1 },
    { name: "Flying, first strike\n", value: 3 },
    { name: "Flying, first strike, haste\n", value: 4 },
    { name: "Flying, first strike, lifelink\n", value: 3 + Number(power) },
    { name: "Flying, haste\n", value: 3 },
    { name: "Flying, hexproof from monocolored\n", value: 5 },
    { name: "Flying, hexproof from multicolored\n", value: 3 },
    { name: "Flying, lifelink\n", value: 2 + Number(power) },
    { name: "Flying, ward {1}\n", value: 2.5 },
    { name: "Flying, ward {2}\n", value: 3 },
    { name: "Flying, lifelink\n", value: 2 + Number(power) },
    { name: "Flying, lifelink, ward {2}\n", value: 3 + Number(power) },
    { name: "Flying, vigilance\n", value: 2 + Number(power) / 2 },
    { name: "Flying, vigilance, haste\n", value: 3 + Number(power) / 2 },
    {
      name: "Flying, vigilance, deathtouch, lifelink\n",
      value: 2 + Number(power) / 2 + 2 + Number(power),
    },
    { name: "Flying, trample\n", value: 3 },
    { name: "Reach\n", value: 1 },
    { name: "Reach, trample\n", value: 1 },
    { name: "First strike\n", value: 1 },
    { name: "First strike, menace\n", value: 2 },
    { name: "First strike, protection from multicolored\n", value: 3 },
    {
      name: "Protection from multicolored (This creature can't be blocked, targeted, dealt damage, enchanted, or equipped by anything multicolored.)\n",
      value: 2,
    },
    { name: "Haste\n", value: 1 },
    { name: "Lifelink\n", value: Number(power) },
    { name: "Trample\n", value: 1 },
    { name: "Trample, ward {2}\n", value: 3 },
    { name: "Vigilance\n", value: Number(power) / 2 },
    { name: "Vigilance, trample, ward {3}\n", value: 6 },
    { name: "Vigilance, trample, lifelink", value: 1 + Number(power) * 1.5 },
    { name: "Vigilance, trample, haste\n", value: 2 + Number(power) / 2 },
    { name: "Double strike\n", value: 1 + Number(power) },
    { name: "Trample\n", value: 1 },
    { name: "Ward {2}\n", value: Number(power) / 2 },
    { name: "Menace\n", value: 2 },
    { name: "Vigilance, reach, trample, haste\n", value: 5 },
    { name: "This spell can't be countered.\n", value: 2 },
    { name: "Trample, ward{4}, haste\nToxic 4", value: 8 },
  ];
  // parse oracle_text for keywords, add to the abilityScore
  let i = 0;
  for (i = 0; i < abilitiesValue.length; i++) {
    if (oracle_text.includes(abilitiesValue[i].name)) {
      abilityScore += Number(abilitiesValue[i].value);
    }
  }
  return abilityScore;
}

async function main() {
  let cards = {};
  if (fs.existsSync("cards/cardsAlchemy.json")) {
    console.log("File exists");
    const backtick = "`";
    let csvText = `name,cmc,power,toughness,pow+tou,abilityValue,oracle_text\n`;
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
      returnedObject["image_uris"] = card.image_uris;
      returnedObject["price"] = card.prices["usd"];
      returnedObject["colors"] = card.colors;
      returnedObject["color_identity"] = card.color_identity;
      returnedObject["set"] = card.set;
      returnedObject["rarity"] = card.rarity;
      if (card.type_line.includes("Creature")) {
        const abilityValue = getKeyWordsFromOracleText(
          returnedObject["oracle_text"],
          card.power
        );

        // oracle_text without comma
        returnedObject["oracle_text"] = returnedObject["oracle_text"].replace(
          /,/g,
          " "
        );

        returnedObject["oracle_text"] = returnedObject["oracle_text"].replace(
          /\n/g,
          ". "
        );

        // replace every instance of name of the card in oracle text with tilde ( ~ )
        returnedObject["oracle_text"] = returnedObject["oracle_text"].replace(
          new RegExp(card.name, "g"),
          "~"
        );

        returnedObject["type"] = "Creature";
        // replace comma in name with space
        returnedObject["name"] = returnedObject["name"].replace(/,/g, " ");
        csvText = `${csvText}${returnedObject["name"]},${
          returnedObject["cmc"]
        },${returnedObject["power"]},${returnedObject["toughness"]},${
          Number(returnedObject["power"]) + Number(returnedObject["toughness"])
        },${abilityValue},${returnedObject["oracle_text"]}\n`;
      }
      return returnedObject;
    });
    console.log(cards);
    fs.writeFileSync("cards/AlchemyCreatureStats.csv", csvText);
  }

  // console.log(cards);
}
main();
