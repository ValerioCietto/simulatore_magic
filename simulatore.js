deck_to_test = `
40 Forest
10 2_cost_add_1_mana
50 Spells
`
import { loadDeck } from './src/loadDeck.js'

simulator = function() {
   console.log('v1.0')
   var deck = [];
   var deck_list = [];
   deck_list = deck_to_test.split("\n")//$("#deck").text().split("\n");
   console.log(deck_list);

   
   // parse deck
//    var i = 0;
//    for(i=0; i < deck_list.length; i++){
//        var j = 0;
//        if(deck_list[i].length > 2){
//            number_of_copies = deck_list[i].split(" ")[0];
//            name_of_card = deck_list[i].substring(number_of_copies.length+1,
//            deck_list[i].length);
//            console.log("copies: "+number_of_copies + 
//            ", name: "+name_of_card); 
//            for(j=0; j < number_of_copies; j++){
//                deck.push(name_of_card);
//            }
//        }
       
//    }
//    var starting_deck = deck;

   var starting_deck = loadDeck(deck_list)
   deck = [...starting_deck]
   deck = shuffle(deck);
   console.log(deck);
   var drawn_cards = draw(deck,8);
   console.log(drawn_cards);
   console.log(win_condition(drawn_cards));
   let forest_turn_1 =0;
   var winning_hands = 0;
   var combo_hand = 0;
   var games_to_play = 100000;

   var mana_available = [];
   for(i=0; i<games_to_play;i++){
       var game_deck = [...starting_deck];
       game_deck = shuffle(game_deck);
       drawn_cards = draw(game_deck,7);
       
       if(combo_hands(drawn_cards)){
           combo_hand++;
       }
    // mulligan example
    //    if(!drawn_cards.includes("Forest")){
    //         game_deck = [...starting_deck];
    //         game_deck = shuffle(game_deck);
    //         drawn_cards = draw(game_deck,6);
    //    }


       if(win_condition(drawn_cards)){
           winning_hands++;
       }
       
       //Play deck
       
       play_deck(drawn_cards)
       
       if(i%100000 == 0){
           console.log(i + " "+game_deck.length);
       }
   }
   console.log("foreste primo turno:"+ forest_turn_1)
   $("cmc1").text(forest_turn_1)
   console.log("winning %: " + winning_hands / games_to_play);
   console.log("combo %: " + combo_hand / games_to_play);

   function draw(deck, number){
       var cards = [];
       var deck_proxy = [...deck];
       var i = 0;
       for(i=0; i<number; i++){
           cards.push(deck_proxy.pop());
       }
       return cards;
   }

   
   function play_deck(drawn_cards){
       let number_of_lands = 0
       let hand = drawn_cards
       if(hand.includes('Forest')){
          hand.splice(hand.indexOf('Forest'),1) //toglie una foresta
          forest_turn_1 += 1
       }
       //object where to save data about how the play has been played
  
   }
   function combo_hands(cards){
       //colorless mana
       if(countInArray(cards, "Basalth Monolith") == 1){
           if(countInArray(cards, "Stonework Packbeast") == 1){
               return true;
           }
           if(countInArray(cards, "Mindshrieker") == 1){
               return true;
           }
           if(countInArray(cards, "Staff of Domination") == 1){
               return true;
           }
           
       }
       if(countInArray(cards, "Freed from the Real") == 1 ||
          countInArray(cards, "Pemmin's Aura") == 1
        ){
           return true;
       }
       if(countInArray(cards, "Horseshoe crab") == 1 ||
          countInArray(cards, "Simic Ragworm") == 1 ||
          countInArray(cards, "Leech Bonder") == 1
       ){
           if(countInArray(cards, "Paradise Mantle") == 1 ||
           countInArray(cards, "Karametra's Favor") == 1 ||
           countInArray(cards, "Utopia Vow") == 1 ||
           countInArray(cards, "Multani's Harmony") == 1
           ){
               return true;
           }
       }
       if(countInArray(cards, "Pili-Pala") == 1 && countInArray(cards, "Grand Architect") == 1){
           return true;
       }
       if(countInArray(cards, "Sylvan Tutor") == 1 && countInArray(cards, "Wordldy Tutor") == 1){
           return true;
       }
       if(countInArray(cards, "Pili-Pala") == 1 && countInArray(cards, "Paradise Mantle") == 1){
           return true;
       }
       return false;
   }

   function win_condition(cards){
       if(countInArray(cards, "Dual") >=2){
           return true;
       }
       if(countInArray(cards, "Dual") >=1 ){
           if(countInArray(cards, "Forest") >=1 ){
               return true;
           }
           if(countInArray(cards, "Island") >=1 ){
               return true;
           }
       }
       if(countInArray(cards, "Forest") >=1 && countInArray(cards, "Island") >=1){
           return true;
       }
       return false ;
   }

   function countInArray(array, what) {
       var count = 0;
       for (var i = 0; i < array.length; i++) {
           if (array[i] === what) {
               count++;
           }
       }
       return count;
   }

   function shuffle(array) {
   var currentIndex = array.length, temporaryValue, randomIndex;

   // While there remain elements to shuffle...
   while (0 !== currentIndex) {

       // Pick a remaining element...
       randomIndex = Math.floor(Math.random() * currentIndex);
       currentIndex -= 1;

       // And swap it with the current element.
       temporaryValue = array[currentIndex];
       array[currentIndex] = array[randomIndex];
       array[randomIndex] = temporaryValue;
   }

   return array;
   }

}
simulator()