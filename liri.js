// This line can read and set  an enviroment variable
require("dotenv").config();
//These import the files needed for the various functions.
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
//variables that take in the command line arguments
var liriCom = process.argv[2];
var input = process.argv.slice(3).join(" ");


var spotify = new Spotify(keys.spotify);

//divider to seperate logs in log.txt file.
var divider =
  "\n------------------------------------------------------------\n\n";



// Here I create liri comands concert-this, spotify-this-song, movie-this and do-what-it-says.
//  I will do this using the switch statment, this allows me to preform diffrent actions based on the conditions.
function command(liriCom, input) {
  switch (liriCom) {
    case "concert-this":
      conInfo(input);
      break;

    case "spotify-this-song":
      spotInfo(input);
      break;

    case "movie-this":
      movInfo(input);
      break;

    case "do-what-it-says":
      doThis();
      break;
  }
}

// if (!search) {
//   search = "spotify-this-song";
// }

// if (!term) {
//   term = "Andy Griffith";
// }

// if (search === "spotify-this-song") {
//   console.log("Searching for your song...");
//   //call function to run here using spotify api
// } else if (search === "concert-this") {
//   console.log("Searching for concerts...");
//   //call function to run here using bandsintown api
// }

// if (search === "movie-this") {
//   console.log("Searching for your movie...");
//   //call function to run here using omdb api
// } 

// if (search === "do-what-it-says") {
//     console.log("type in one of the following commands:'movie-this', 'conert-this', 'spotify-this-song'")
// }
// else {
//    console.log(err); 
// }


// Make it so liri.js can take in one of the following commands:

// concert-this

// spotify-this-song

// movie-this

// do-what-it-says

// --------------------------------------------- CONCERTS ------------------------------------------------

// function for "concert-this" command.
function conInfo(input) {
  // query url
  var queryUrl =
    "https://rest.bandsintown.com/artists/" +
    input +
    "/events?app_id=codingbootcamp";

  //If no band is provided, use lil wayne
  // if (!input) {
  //   input = "Lil wayne";
  // }


  // Performing get request
  axios.get(queryUrl).then(function (response) {
    var bandInfo = response.data[0];

    // properties end up being the string containing the show data we will print to the console
    var eveInfo = [
      "Band:" + bandInfo.lineup,
      "Venue:" + bandInfo.venue.name,
      "City:" + bandInfo.venue.city,
      "Date:" + moment(bandInfo.datetime).format("MM DD YYYY")
    ].join("\n\n");

    // Append properties and the divider to log.txt, print showData to the console
    fs.appendFile("log.txt", eveInfo + divider, function (err) {
      if (err) throw err;
      console.log(eveInfo);
    });
  });
}

// --------------------------------------------- SPOTIFY ------------------------------------------------

// function for "spotify-this-song" command.
function spotInfo(songName) {
  var spotify = new Spotify(keys.spotify);

  //If no song is provided, use "The Sign"
  if (!songName) {
    songName = "under the bridge";
  }

  //Callback to spotify to search for song name
  spotify.search({ type: "track", query: songName }, function (err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }

    // properties end up being the string containing the show data we will print to the console
    var songInfo = [
      "Artist: " + data.tracks.items[0].artists[0].name,
      "Song name: " + data.tracks.items[0].name,
      "Album Name: " + data.tracks.items[0].album.name,
      "Preview Link: " + data.tracks.items[0].preview_url
    ].join("\n\n");

    //Appends text to log.txt file
    fs.appendFile("log.txt", songInfo + divider, function (err) {
      if (err) throw err;
      console.log(songInfo);
    });
  });
}

// --------------------------------------------- MOVIE ------------------------------------------------
function movInfo(movieName) {
  //If no movie name is provided, use Mr.Nobody as default
  if (!movieName) {
    movieName = "elf";
  }

  // query url
  var queryUrl =
    "https://www.omdbapi.com/?t=" +
    movieName +
    "&y=&plot=short&r=json&tomatoes=true&apikey=trilogy";

  // Performing get request
  axios.get(queryUrl).then(function (response) {
    var movieResult = response.data;

    // properties end up being the string containing the show data we will print to the console
    var listing = [
      "Title:" + movieResult.Title,
      "Year:" + movieResult.Year,
      "IMDB Rating:" + movieResult.Ratings[0].Value,
      "Rotten Tomatoes Rating:" + movieResult.Ratings[1].Value,
      "Country:" + movieResult.Country,
      "Language:" + movieResult.Language,
      "Plot:" + movieResult.Plot,
      "Actors:" + movieResult.Actors
    ].join("\n\n");

    // Append properties and the divider to log.txt, print showData to the console
    fs.appendFile("log.txt", listing + divider, function (err) {
      if (err) throw err;
      console.log(listing);
    });
  });
}

// --------------------------------------------- DO-THIS ------------------------------------------------


// App functionality due to user input
function doThis() {
  fs.readFile('random.txt', "utf8", function (error, data) {

    if (error) {
      return console.log(error);
    }

    // Then split it by commas (to make it more readable)
    var dataArr = data.split(",");

    // I used and if statment to loop through the commands that might be present in random.txt
    if (dataArr[0] === "spotify-this-song") {
      var songcheck = dataArr[1].slice(1, -1);
      spotInfo(songcheck);
    } else if (dataArr[0] === "concert-this") {
      var concert = dataArr[1].slice(1, -1);
      conInfo(concert);
    } else if (dataArr[0] === "movie-this") {
      var listing = dataArr[1].slice(1, -1);
      movInfo(listing);
    }

  });

};

command(liriCom, input);