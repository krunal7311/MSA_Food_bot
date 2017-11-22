var rest = require('/Volumes/Krunal/University/MSA/AdvancedTraining/MSA_Food_bot/API/Restclient');

exports.displayFavouriteFood = function getFavouriteFood(session, username){
    var url = 'http://foodbot7311.azurewebsites.net/tables/foodtable';
    rest.getFavouriteFood(url, session, username, handleFavouriteFoodResponse)
};


function handleFavouriteFoodResponse(message, session, username) {
    var favouriteFoodResponse = JSON.parse(message);
    var allFoods = [];
    for (var index in favouriteFoodResponse) {
        var usernameReceived = favouriteFoodResponse[index].username;
        var favouritefood = favouriteFoodResponse[index].favouritefood;

        //Convert to lower case whilst doing comparison to ensure the user can type whatever they like
        if (username.toLowerCase() === usernameReceived.toLowerCase()) {
            //Add a comma after all favourite foods unless last one
            if(favouriteFoodResponse.length - 1) {
                allFoods.push(favouritefood);
            }
            else {
                allFoods.push(favouritefood + ', ');
            }
        }        
    }
    
    // Print all favourite foods for the user that is currently logged in
    session.send("%s, your favourite foods are: %s", username, allFoods);                
    
}