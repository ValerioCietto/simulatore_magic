// launch with node simulator/game-engine/abilities.js

// import cardsAlchemy.json
const alchemyData = require("../../cards/cardsAlchemy.json");

function parseAbilities(card) {
  // if card name starts by A-, remove A-
  if (card.name.startsWith("A-")) {
    card.name = card.name.substring(2);
  }
  // if card.name contains "//", return true
  if (card.name.includes("//")) {
    // skip double
    return true;
  }

  console.log(card.name);
  console.log(card.type_line);

  let ruleText = card.oracle_text;
  // replace in ruleText all occurrencies of the name of the card with tilde ( ~ )
  ruleText = ruleText.replace(new RegExp(card.name, "g"), "~");

  // remove from ruletext all reminder text
  // a reminder text is a string that starts with " (" and ends with ")"
  ruleText = ruleText.replace(/ \([^)]*\)/g, "");

  console.log(ruleText);

  card.combatAbilities = [];
  card.staticAbilities = [];
  card.triggeredAbilities = [];
  card.activatedAbilities = [];

  if (ruleText.includes("Trample\n")) {
    card.combatAbilities.push("Trample");
    // remove Trample from ruleText
    ruleText = ruleText.replace("Trample\n", "");
  } else if (ruleText.includes("Flying\n")) {
    card.combatAbilities.push("Flying");
    ruleText = ruleText.replace("Flying\n", "");
  } else if (ruleText.includes("Vigilance\n")) {
    card.combatAbilities.push("Vigilance");
    ruleText = ruleText.replace("Vigilance\n", "");
  } else if (ruleText.includes("Flying, ward {2}\n")) {
    card.combatAbilities.push("Flying");
    card.staticAbilities.push("Ward {2}");
    ruleText = ruleText.replace("Flying, ward {2}\n", "");
  }
  console.log(card.combatAbilities);

  if (ruleText.includes("At the beginning of each player's draw step,")) {
    const rulename = "At the beginning of each player's draw step,";
    const trigger = "onBeginPlayerDrawStep";
    // parse effect, that is the sentence after the trigger and before "."
    const effectStart = ruleText.indexOf(rulename) + rulename.length;
    const effectEnd = ruleText.indexOf(".", effectStart);
    const effect = ruleText.substring(effectStart, effectEnd).trim();
    card.triggeredAbilities.push({
      trigger: "onBeginPlayerDrawStep",
      effect: effect,
    });
    // remove ruleName and effect from ruleText
    ruleText = ruleText.replace(rulename + " ", "");
    ruleText = ruleText.replace(effect + ".", "");
  }

  if (ruleText.includes("Whenever you cast an instant or sorcery spell,")) {
    const rulename = "Whenever you cast an instant or sorcery spell,";
    const trigger = "onCastSpellSorceryOrInstant";
    // parse effect, that is the sentence after the trigger and before "."
    const effectStart = ruleText.indexOf(rulename) + rulename.length;
    const effectEnd = ruleText.indexOf(".", effectStart);
    const effect = ruleText.substring(effectStart, effectEnd).trim();
    card.triggeredAbilities.push({
      trigger: "onCastSpellSorceryOrInstant",
      effect: effect,
    });
    // remove ruleName and effect from ruleText
    ruleText = ruleText.replace(rulename + " ", "");
    ruleText = ruleText.replace(effect + ".", "");
    if (ruleText.includes("If you do,")) {
      const rulename = "If you do,";
      const trigger = "onCastSpellSorceryOrInstant";
      // parse effect, that is the sentence after the trigger and before "."
      const effectStart = ruleText.indexOf(rulename) + rulename.length;
      const effectEnd = ruleText.indexOf(".", effectStart);
      const effect = ruleText.substring(effectStart, effectEnd).trim();
      // add effect to the effect of previous trigger valued onCastSpellSorceryOrInstant
      card.triggeredAbilities[card.triggeredAbilities.length - 1].effect +=
        ". " + rulename + " " + effect;
      // remove ruleName and effect from ruleText
      ruleText = ruleText.replace(rulename + " ", "");
      ruleText = ruleText.replace(effect + ".", "");
    }
    if (ruleText.includes("This ability triggers only once each turn.")) {
      const rulename = "This ability triggers only once each turn.";
      const trigger = "onCastSpellSorceryOrInstant";
      // add "This ability triggers only once each turn." to the effect of previous trigger valued onCastSpellSorceryOrInstant
      card.triggeredAbilities[card.triggeredAbilities.length - 1].effect +=
        ". " + rulename;

      // remove ruleName and effect from ruleText
      ruleText = ruleText.replace(rulename, "");
    }
  }

  if (ruleText.includes("Whenever ~ deals combat damage to a player,")) {
    const rulename = "Whenever ~ deals combat damage to a player,";
    const trigger = "onCombatDamageToPlayer";
    // parse effect, that is the sentence after the trigger and before "."
    const effectStart = ruleText.indexOf(rulename) + rulename.length;
    const effectEnd = ruleText.indexOf(".", effectStart);
    const effect = ruleText.substring(effectStart, effectEnd).trim();

    card.triggeredAbilities.push({
      trigger: "onCombatDamageToPlayer",
      effect: effect,
    });
    // remove ruleName and effect from ruleText
    ruleText = ruleText.replace(rulename + " ", "");
    ruleText = ruleText.replace(effect + ".", "");
  }
  if (ruleText.includes("When ~ enters the battlefield,")) {
    const rulename = "When ~ enters the battlefield,";
    const trigger = "onEnterTheBattlefield";
    // parse effect, that is the sentence after the trigger and before "."
    const effectStart = ruleText.indexOf(rulename) + rulename.length;
    const effectEnd = ruleText.indexOf(".", effectStart);
    const effect = ruleText.substring(effectStart, effectEnd).trim();

    card.triggeredAbilities.push({
      trigger: "onEnterTheBattlefield",
      effect: effect,
    });
    // remove ruleName and effect from ruleText
    ruleText = ruleText.replace(rulename + " ", "");
    ruleText = ruleText.replace(effect + ".", "");
  }

  if (ruleText.includes("When ~ dies,")) {
    const rulename = "When ~ dies,";
    const trigger = "onDie";
    // parse effect, that is the sentence after the trigger and before "."
    const effectStart = ruleText.indexOf(rulename) + rulename.length;
    const effectEnd = ruleText.indexOf(".", effectStart);
    const effect = ruleText.substring(effectStart, effectEnd).trim();
    card.triggeredAbilities.push({
      trigger: "onDie",
      effect: effect,
    });
    // remove ruleName and effect from ruleText
    ruleText = ruleText.replace(rulename + " ", "");
    ruleText = ruleText.replace(effect + ".", "");
  }
  if (ruleText.includes("At the beginning of your end step,")) {
    const rulename = "At the beginning of your end step,";
    const trigger = "onEndStep";
    // parse effect, that is the sentence after the trigger and before "."
    const effectStart = ruleText.indexOf(rulename) + rulename.length;
    const effectEnd = ruleText.indexOf(".", effectStart);
    const effect = ruleText.substring(effectStart, effectEnd).trim();
    card.triggeredAbilities.push({
      trigger: "onEndStep",
      effect: effect,
    });
    // remove ruleName and effect from ruleText
    ruleText = ruleText.replace(rulename + " ", "");
    ruleText = ruleText.replace(effect + ".", "");
  }

  console.log(card.triggeredAbilities);

  // if ruleText is not empty, console log remaining text
  if (ruleText !== "") {
    console.log(ruleText);
    return false;
  } else {
    console.log("PARSE OK");
    return true;
  }
}

function main() {
  // test the function parseAbilities
  let startingCardIndex = 33;
  let parseOK = false;

  do {
    console.log(alchemyData[startingCardIndex]);
    parseOK = parseAbilities(alchemyData[startingCardIndex]);
    startingCardIndex++;
    console.log(startingCardIndex);
  } while (parseOK);
}

main();
