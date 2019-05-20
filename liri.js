require("dotenv").config();
//requiring node packagws.
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");

// Grabbing the search type argument
var search = process.argv[2];
// Joining the remaining arguments since an actor or tv show name may contain spaces
var term = process.argv.slice(3).join(" ");

if (!search) {
    search = "spotify-this-song";
  }
  
  if (!term) {
    term = "Andy Griffith";
  }
  
  if (search === "spotify-this-song") {
    console.log("Searching for your song...");
    //call function to run here using spotify api
  } else if (search === "concert-this") {
    console.log("Searching for concerts...");
    //call function to run here using bandsintown api
  }

  if (search === "movie-this") {
    console.log("Searching for your movie...");
    //call function to run here using omdb api
  } 

  if (search === "do-what-it-says") {
      console.log("type in one of the following commands:'movie-this', 'conert-this', 'spotify-this-song'")
  }
  else {
     console.log(err); 
  }
  

// Make it so liri.js can take in one of the following commands:

// concert-this

// spotify-this-song

// movie-this

// do-what-it-says