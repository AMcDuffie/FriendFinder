// Pull in required dependencies
var path = require('path');

//pull in the friends list
var friends = require("../data/friends");

//exporting the api rout
module.exports = function(app) {

 //Get list of friends
app.get('/api/friends', function(req, res) {
    res.json (friends)
    });
      
 //Add user information      
app.post('/api/friends', function(req, res) {
    console.log(req.body)
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
    var newcharacter = req.body;

//   //have to put the math here
    var userResponses = newcharacter.scores;

//   // Mathe for best friend match
  var matchName = '';
  var matchImage = '';
  var totalDifference = 10000; // Make the initial value big for comparison

  // Examine all existing friends in the list
  for (var i = 0; i < friends.length; i++) {

      // Compute differenes for each question
      var diff = 0;
      for (var j = 0; j < userResponses.length; j++) {
          diff += Math.abs(friends[i].scores[j] - userResponses[j]);
      }

      // If lowest difference, record the friend match
      if (diff < totalDifference) {

        //Check for total difference in user and friends score
          totalDifference = diff;
          matchName = friends[i].name;
          matchImage = friends[i].photo;
      }
  }

  // Add new user
  friends.push(newcharacter);

//   // Send appropriate response

    // var matchName = "Ahmed"
    // var matchImage = "https://static.thisisinsider.com/image/59f1e2b61f58cc4c008b458a-750.jpg"
res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
// res.end('ok')
           });
    };