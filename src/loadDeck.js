

/**
 * 
 * @param {String} deck 
 */
function loadDeck(deck_to_test){
    let deck = [];
    let deck_list = [];
    deck_list = deck_to_test.split("\n")//$("#deck").text().split("\n");
    console.log(deck_list);
    // parse deck
    let i = 0;
    for(i=0; i < deck_list.length; i++){
        let j = 0;
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
    return deck;
}
