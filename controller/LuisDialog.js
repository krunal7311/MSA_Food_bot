var builder = require('botbuilder');

var food=require("./FavouriteFoods");
// Some sections have been omitted

exports.startDialog = function (bot) {
    
    // Replace {YOUR_APP_ID_HERE} and {YOUR_KEY_HERE} with your LUIS app ID and your LUIS key, respectively.
    var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/78de7b18-0b0d-4f8c-8f41-f17bd52cd7af?subscription-key=268e389caeb54316bccb0b3fc279d22c&verbose=true&timezoneOffset=0&q=');

    bot.recognizer(recognizer);

    bot.dialog('GetCalories', function (session, args) {
       
                session.send("Get Calories intent found");
            
    }).triggerAction({
        matches: 'GetCalories'
    });

    bot.dialog('WantFood', function (session, args) {
        
                 session.send("Want Food intent found");
             
     }).triggerAction({
         matches: 'WantFood'
     });

     bot.dialog('GetFavouriteFood', [
        function (session, args, next) {
            session.dialogData.args = args || {};        
            if (!session.conversationData["username"]) {
                builder.Prompts.text(session, "Enter a username to setup your account.");                
            } else {
                next(); // Skip if we already have this info.
            }
        },
        function (session, results, next) {

                if (results.response) {
                    session.conversationData["username"] = results.response;
                }

                session.send("Retrieving your favourite foods");
                food.displayFavouriteFood(session, session.conversationData["username"]);  // <---- THIS LINE HERE IS WHAT WE NEED 
            
        }
    ]).triggerAction({
        matches: 'GetFavouriteFood'
    });

     bot.dialog('WelcomeIntent', function (session, args) {
        
                 session.send("Welcome intent found");
             
     }).triggerAction({
         matches: 'WelcomeIntent'
     });
     
}