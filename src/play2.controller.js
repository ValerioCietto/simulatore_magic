var app = angular.module("myApp", []);

app.controller("myCtrl", function ($scope) {
  var playerHand = [];
  var playerLands = [];
  var playerCreatures = [];
  var playerEnchantments = [];
  var playerArtifacts = [];

  var turns = []; // at the end of each turn, push turn here

  var deckString = `4 Toadstool Admirer
4 Woodland Mystic
2 Verdant Outrider
4 Hulking Raptor
4 Gigantosaurus
4 Earthshaker Dreadmaw
4 Nurturing Bristleback
34 Forest`;

  var cards = deckString.split("\n");
  $scope.cards = cards;

  var deck = [];

  for (i = 0; i < cards.length; i++) {
    var count = cards[i].split(" ")[0];
    // console.log(count);
    var name = cards[i].substring(count.length + 1, cards[i].length);
    // console.log(name);

    for (j = 0; j < count; j++) {
      deck.push(name);
    }
  }
  function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
  }

  shuffle(deck);
  $scope.deck = deck;
  console.log(deck);

  cardsDatabase = [];
  $scope.loading = "loading in progress";
  console.log($scope.loading);
  fetch("../cards/cardsAlchemy.json")
    .then((response) => response.json())
    .then((data) => {
      cardsDatabase = data;
      console.log(cardsDatabase);

      // make a new object called deckWithCardData, match card name with card data from cardsDatabase

      deckWithCardData = [];
      for (i = 0; i < deck.length; i++) {
        for (j = 0; j < cardsDatabase.length; j++) {
          if (deck[i] == cardsDatabase[j].name) {
            deckWithCardData.push(cardsDatabase[j]);
          }
        }
      }
      $scope.loading = "loading complete";
      console.log($scope.loading);
      $scope.deckWithCardData = deckWithCardData;
      console.log(deckWithCardData);

      startGame();
      $scope.$digest();
    });

  function startGame() {
    // draw 7 cards
    playerHand = [];

    $scope.playerHand = playerHand;

    console.log(playerHand);
    console.log(deck);
    playerHand.push(deckWithCardData.pop());
    playerHand.push(deckWithCardData.pop());
    playerHand.push(deckWithCardData.pop());
    playerHand.push(deckWithCardData.pop());
    playerHand.push(deckWithCardData.pop());
    playerHand.push(deckWithCardData.pop());
    playerHand.push(deckWithCardData.pop());
    playerHand.push(deckWithCardData.pop());
    makeTurn();
  }

  function makeTurn() {
    console.log("make turn");
    // draw a card
    // if in hand there is a land, play a land
    var landOfTurnPlayed = false;
    for (let index = 0; index < playerHand.length; index++) {
      const element = playerHand[index];
      if (element.name === "Forest" && !landOfTurnPlayed) {
        playerLands.push(element);

        // remove land from hand
        playerHand.splice(index, 1);
        landOfTurnPlayed = true;
        console.log("land of turn played", index);
        break;
      }
    }

    console.log(playerLands);
    $scope.playerLands = playerLands;
    const mana = countManaAvailable(playerLands, playerCreatures);
    $scope.playerMana = mana;
    console.log(mana);

    playCreature(playerCreatures, playerHand, mana);

    // play a card
    // end turn
    $scope.$digest();
  }

  function playCreature(playerCreatures, playerHand, cmc) {
    console.log("find playable cards");
    // order playerHand by element.cmc descending
    playerHand.sort(function (a, b) {
      return b.cmc - a.cmc;
    });
    console.log(playerHand);
    $scope.playerHand = playerHand;

    for (let index = 0; index < playerHand.length; index++) {
      const element = playerHand[index];
      if (element.cmc <= cmc && element.type_line.includes("Creature")) {
        playerCreatures.push(element);
        playerHand.splice(index, 1);
        $scope.playerMana = $scope.playerMana - element.cmc;
        console.log("card played", index);
        break;
      }
    }
    console.log(playerCreatures);
    $scope.playerCreatures = playerCreatures;
    console.log(playerHand);
    $scope.playerHand = playerHand;

    $scope.$digest();
  }

  function countManaAvailable(playerLands, playerCreatures) {
    let manaAvailable = 0;

    for (let index = 0; index < playerLands.length; index++) {
      const element = playerLands[index];
      if (element.name === "Forest") {
        manaAvailable += 1;
      }
    }
    for (let index = 0; index < playerCreatures.length; index++) {
      const element = playerCreatures[index];
      if (element.name === "Woodland Mystic") {
        manaAvailable += 1;
      }
      if (element.name === "Hulking Raptor") {
        manaAvailable += 2;
      }
    }
    $scope.manaAvailable = manaAvailable;
    return manaAvailable;
  }
});
