// make sure your .env has the right format
// MONGO_URI=bla bla

process.loadEnvFile(__dirname + "/.env"); //!

const express = require("express");

const server = express();
const PORT = 3100;

server.listen(PORT, () => {
    console.log("Server is Ready!");
    console.log("My Mongo URI is", process.env.MONGO_URI); //!

});

// Start from an empty folder (not inside an existing git repo)
//  npm init -y
// 10051  npm install express
// 10052  touch server.js
// 10053  node server.js
// 10054  git init
// 10055  git status
// 10056  git add -A
// 10057  git commit -am "first commit"


// 10063  git remote add origin https://github.com/vladimirsan/mongodb-class.git
// 10064  git status
// 10065  git commit -am 'changes to server.js'
// 10066  git push -u origin maino



// create user
// add roles (read and write to your db)
// go to cluster
// click connect
// make sure you click 'driver and client libraries'
// select Javascript and Mongoose
// copy the connection string on the bottom
// bring that into .env

// URL = Uniform Resource Locator
// URI = Uniform Resource Identifier




