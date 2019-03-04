/* --------------
//  Your apiRoutes.js file should contain two routes:
//
//  A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
//  A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
// -------------------- */

//"use strict";

var path = require("path"); 
var friends = require("../app/data/friends.js");

// Routes
// =============================================================
module.exports = function(app) {

    // Each of the below routes just handles the HTML page that the user gets sent to.
  
    // index route loads view.html
    app.get("/api/friends", function(req, res) {
      return res.json(friends);
    });

    app.post("/api/friends", function(req, res){
       
        var newFriend = req.body;
        var scoreCompareArray = [];
        var finalScoresArray = [];
        var matchScoreIndex = 0;
        var i = 0;

        // Second step is to go through the results array and add the scores one by one, highest scores is the match, 
        //      The position of the original friends scores will be safe so we can refer to it when wre finish. 

        function getTotalDifference(array){
            var score = 0;
            // add all the members of the array and push it to another array with the final scores
            for (var j=0; j < array.length; j++){
                score = score + array[j];
            }
            //console.log("score = " + score);

            //push the score to the final score Array:

            finalScoresArray.push(score);

            //console.log("finalScoresArray: " + finalScoresArray); 

            // get the lowest number of the finalScores Array, that will be the winner. 
            //  Save the index as that will be the match at friends.js file
            var lowestScore = Math.min(...finalScoresArray);
            matchScoreIndex = finalScoresArray.indexOf(lowestScore); 

            //console.log("lowestScore = " + lowestScore + " matchScoreIndex: " + matchScoreIndex); 

        }

        // Create a function to do a first comparision between the newFriend Score and the existent ones in the DB.
        //      The result will be a number of arrays with the difference between the different scores

        function calculateScoreDifference(){
            
            if (friends !== []) {
                if (i < friends.length) {
                    scoreCompareArray = [];
                    for (var j = 0; j < newFriend.scores.length; j++) {
                        var diff = Math.abs(newFriend.scores[j] - friends[i].scores[j]);
                        scoreCompareArray.push(diff);
                    }
                   // console.log("scoreCompare: " + scoreCompareArray);
                    i++;
                    getTotalDifference(scoreCompareArray);
                    calculateScoreDifference();
                }
            }
        }

        calculateScoreDifference();

        
        var data = {name: " ",
                    photo: " "};

        data.name = friends[matchScoreIndex].name;
        data.photo = friends[matchScoreIndex].photo;

        //console.log(data.name);
        
        //uncomment at the end
        friends.push(newFriend); 

/*        var data={name: "Fito",
                  photo: "https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/09/12/11/naturo-monkey-selfie.jpg?w968"};
*/
        return res.send(data);
          
    });
  
};
