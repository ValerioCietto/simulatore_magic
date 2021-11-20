simulator = function() {
   var deck = [];
   var deck_list = [];
   deck_list = $("#deck").text().split("\n");
   console.log(deck_list);
   // parse deck
   var i = 0;
   for(i=0; i < deck_list.length; i++){
       var j = 0;
       if(deck_list[i].length > 2){
           number_of_copies = deck_list[i].split(" ")[0];
           name_of_card = deck_list[i].substring(number_of_copies.length+1,
           deck_list[i].length);
           console.log("copies: "+number_of_copies + 
           ", name: "+name_of_card); 
           for(j=0; j < number_of_copies; j++){
               deck.push(name_of_card);
           }
       }
       
   }
   var starting_deck = deck;
   deck = shuffle(deck);
   console.log(deck);
   var drawn_cards = draw(deck,8);
   console.log(drawn_cards);
   console.log(win_condition(drawn_cards));

   var winning_hands = 0;
   var combo_hand = 0;
   var games_to_play = 100000;
   //16462 t0 
   //33412 t1 220837
   //57132 t2 
   //86280 t3
   //122957 t4
   //162593 t5 592780
   //t6 728586
   //t7 780000
   //t8 824000
   //   859
   var mana_available = [];
   for(i=0; i<games_to_play;i++){
       var game_deck = [...starting_deck];
       game_deck = shuffle(game_deck);
       drawn_cards = draw(game_deck,8);
       
       if(combo_hands(drawn_cards)){
           combo_hand++;
       }
       else{
           game_deck = [...starting_deck];
           game_deck = shuffle(game_deck);
           drawn_cards = draw(game_deck,7);
           if(combo_hands(drawn_cards)){
               combo_hand++;
           }
           else{
               game_deck = [...starting_deck];
               game_deck = shuffle(game_deck);
               drawn_cards = draw(game_deck,6);
               if(combo_hands(drawn_cards)){
                   combo_hand++;
               
               }

           }
       }
       if(win_condition(drawn_cards)){
           winning_hands++;
       }
       
       //Play deck
       
       if(i%100000 == 0){
           console.log(i + " "+game_deck.length);
       }
   }
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

   var number_of_lands = 0;
   function play_deck(drawn_cards){
       
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