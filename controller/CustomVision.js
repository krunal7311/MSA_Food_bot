var request = require('request'); //node module for http post requests

exports.retreiveMessage = function (session){

    request.post({
        url: 'https://southcentralus.api.cognitive.microsoft.com/customvision/v1.0/Prediction/92f05d0a-52fd-4d06-a93f-e3d90817b134/url?iterationId=ff6d87d9-b846-40b9-8892-c0a960cbb0e6',
        json: true,
        headers: {
            'Content-Type': 'application/json',
            'Prediction-Key': '998c42bf3534444ab88e4fa8c664e13c'
        },
        body: { 'Url': session.message.text }
    }, function(error, response, body){
        console.log(validResponse(body));
        session.send(validResponse(body));
    });
}

function validResponse(body){
    if (body && body.Predictions && body.Predictions[0].Tag){
        return "This is " + body.Predictions[0].Tag
    } else{
        console.log('Oops, please try again!');
    }
}