require("dotenv").config();

var keys = require("./keys.js");

var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];

function tweets(){
    client.get('statuses/home_timeline', function(error, tweets, response) {
        if(error) throw error;
        for(var i = 0; i < tweets.length; i++){
            console.log(tweets[i].text);
            console.log('');
            console.log(tweets[i].user.name);
            console.log(tweets[i].created_at);
            console.log("----------------------")
        }
          // The tweets.  
      });
}

function music(){
    if(process.argv[3] === undefined){
        spotify.search({ type: 'track', query: 'The Sign' }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
           for(var j = 0; j < data.tracks.items.length; j++){
               if(data.tracks.items[j].artists[0].name === "Ace of Base" && data.tracks.items[j].name === "The Sign"){
                   console.log("Artist(s): " + data.tracks.items[j].artists[0].name);
                   console.log("Song Name: " + data.tracks.items[j].name);
                   console.log("Preview Link: " + data.tracks.items[j].preview_url);
                   console.log("Album: " + data.tracks.items[j].album.name);
               }
            // console.log(data.tracks.items[j].artists[0].name);
           }
           
          });
    }
    else{
        var songName = "";
        for (var i = 3; i < process.argv.length; i++) {
            songName = songName + " " + process.argv[i];
          }
        //   console.log(songName);
          spotify.search({ type: 'track', query: songName }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
           for(var j = 0; j < data.tracks.items.length; j++){
            //    console.log(data.tracks.items[j].name);
               if(data.tracks.items[j].name === songName.trim()){
                   console.log("Artist(s): " + data.tracks.items[j].artists[0].name);
                   console.log("Song Name: " + data.tracks.items[j].name);
                   console.log("Preview Link: " + data.tracks.items[j].preview_url);
                   console.log("Album: " + data.tracks.items[j].album.name);
                   console.log("");
               }
            //    else{
            //        console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
            //        console.log("Song Name: " + data.tracks.items[0].name);
            //        console.log("Preview Link: " + data.tracks.items[0].preview_url);
            //        console.log("Album: " + data.tracks.items[0].album.name);
            //        console.log("");
            //    }
            // console.log(data.tracks.items[j].artists[0].name);
           }
           
          });
    }
};

function movie(){
    var movieName = "";
        for (var i = 3; i < process.argv.length; i++) {
            movieName = movieName + " " + process.argv[i];
          }

        if(process.argv[3] === undefined){
            request("http://www.omdbapi.com/?t=Mr.Nobody&y=&plot=short&apikey=trilogy", function(error, response, body) {

                // If the request is successful (i.e. if the response status code is 200)
                if (!error && response.statusCode === 200) {
              
                  // Parse the body of the site and recover just the imdbRating
                  // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
                //   console.log(body);
                  console.log("Movie Title: " + JSON.parse(body).Title);
                  console.log("Year: " + JSON.parse(body).Year);
                  console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                  console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
                  console.log("Country of production: " + JSON.parse(body).Country);
                  console.log("Language: " + JSON.parse(body).Language);
                  console.log("Plot: " + JSON.parse(body).Plot);
                  console.log("Actors: " + JSON.parse(body).Actors);
                }
              });
        } 
        else{
            request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
                if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
                    console.log("Movie Title: " + JSON.parse(body).Title);
                    console.log("Year: " + JSON.parse(body).Year);
                    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
                    console.log("Country of production: " + JSON.parse(body).Country);
                    console.log("Language: " + JSON.parse(body).Language);
                    console.log("Plot: " + JSON.parse(body).Plot);
                    console.log("Actors: " + JSON.parse(body).Actors);
                }
            });
        }
};

function reader(){
    fs.readFile("random.txt", "utf8", function(error, data){
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(",");

  // We will then re-display the content as an array for later use.
        if(dataArr[0] === `my-tweets`){
            tweets();
        };
        if(dataArr[0] === `spotify-this-song`){
            var track = dataArr[1].slice(1, dataArr[1].length-1);
            // console.log(track);
            spotify.search({ type: 'track', query: track }, function(err, data) {
                if (err) {
                  return console.log('Error occurred: ' + err);
                }
                // console.log(data.tracks.items[0].name);
               for(var j = 0; j < data.tracks.items.length; j++){
                //    console.log(data.tracks.items[j].name);
                   
                    //    console.log(data);
                       console.log("Artist(s): " + data.tracks.items[j].artists[0].name);
                       console.log("Song Name: " + data.tracks.items[j].name);
                       console.log("Preview Link: " + data.tracks.items[j].preview_url);
                       console.log("Album: " + data.tracks.items[j].album.name);
                       console.log("");
          
                //    else{
                //        console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
                //        console.log("Song Name: " + data.tracks.items[0].name);
                //        console.log("Preview Link: " + data.tracks.items[0].preview_url);
                //        console.log("Album: " + data.tracks.items[0].album.name);
                //        console.log("");
                //    }
                // console.log(data.tracks.items[j].artists[0].name);
               }
               
              });
        };
        if(dataArr[0] === `movie-this`){
            request("http://www.omdbapi.com/?t=" + dataArr[1].slice(1, dataArr[1].length-1) + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
                if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
                    console.log("Movie Title: " + JSON.parse(body).Title);
                    console.log("Year: " + JSON.parse(body).Year);
                    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
                    console.log("Country of production: " + JSON.parse(body).Country);
                    console.log("Language: " + JSON.parse(body).Language);
                    console.log("Plot: " + JSON.parse(body).Plot);
                    console.log("Actors: " + JSON.parse(body).Actors);
                }
            });
        };
    })
}

if(command === `my-tweets`){
    tweets();
};
if(command === `spotify-this-song`){
    music();
};
if(command === `movie-this`){
     movie();
};
if(command === `do-what-it-says`){
    reader();
};