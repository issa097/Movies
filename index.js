// const express = require('express');
// const app = express();
// const https = require('https');

// app.set('view engine', 'ejs');

// const hostname = '127.0.0.1';
// const port = 3000;

// const options = {
//   method: 'GET',
//   hostname: 'movies-tv-shows-database.p.rapidapi.com',
//   port: null,
//   path: '/?movieid=tt1375666',
//   headers: {
//     Type: 'get-movie-details',
//     'X-RapidAPI-Key': '56183aebf0msh136e86467295aa3p17ff88jsn666f9e98bb95',
//     'X-RapidAPI-Host': 'movies-tv-shows-database.p.rapidapi.com'
//   }
// };

// app.get('/', (req, res) => {
//   const reqExternal = https.request(options, (resExternal) => {
//     const chunks = [];

//     resExternal.on('data', (chunk) => {
//       chunks.push(chunk);
//     });

//     resExternal.on('end', () => {
//       const body = Buffer.concat(chunks);
//       const data = JSON.parse(body.toString()); // Parse the response to JSON

//       // Set response headers and send the JSON data
//       res.setHeader('Content-Type', 'application/json');
//       res.status(200).json(data);
//     });
//   });

//   reqExternal.on('error', (error) => {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   });

//   reqExternal.end();
// });

// app.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

const express = require("express");
const { request } = require("http");
const app = express();
const http = require("https");
app.set("view engine", "ejs");

const hostname = "127.0.0.1";
const port = 3000;
app.get("/hom", (request, response) => {
  const options = {
    method: "GET",
    hostname: "imdb-top-100-movies.p.rapidapi.com",
    port: null,
    path: "/top100movies",
    headers: {
      "X-RapidAPI-Key": "f2578ffc76msh2d560b4523517d4p18ced2jsn4cdb7d56cb4d",
      "X-RapidAPI-Host": "imdb-top-100-movies.p.rapidapi.com",
    },
  };

  const req = http.request(options, function (res) {
    const chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      const body = Buffer.concat(chunks);
      console.log(body.toString());
     const view = JSON.parse(body);
      const filteredMovies = view.filter((movie) => movie.genre == "Drama");

      response.render("home.ejs", { movie: filteredMovies });
    
    });
  });

  req.end();
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
