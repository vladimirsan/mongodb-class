// // make sure your .env has the right format
// // MONGO_URI=bla bla

// process.loadEnvFile(__dirname + "/.env"); //!

// const express = require("express");
// const mongoose = require("mongoose");

// const server = express();
// const PORT = 3100;

// // ALlows me to have json as a request body
// server.use(express.json());
// const Questions = mongoose.model("Question", new mongoose.Schema({text:String}));

// server.post("/questions", async (request, response) => {
//     console.log(request.body.question);

//     // we use new because mongoose.Schema is a 'factory' of objects (i.e a Class)

//     // I'm going to create a new value in the database that looks like this {text: "What is your name?"}
//     // This line is going to the internet and creating a value in the cloud
//     // stop everything here until you get your response from the internet
//     await Questions.create({text: request.body.question});

//     response.status(201).send(); // No Content -> Often use for creation
// });

// server.listen(PORT, () => {
//     console.log("Server is Ready!");
//     console.log("My Mongo URI is", process.env.MONGO_URI); //!

//     mongoose.connect(process.env.MONGO_URI, {
//         dbName: "class19_questions"
//     });
// });

// // Start from an empty folder (not inside an existing git repo)
// //  npm init -y
// // 10051  npm install express
// // 10052  touch server.js
// // 10053  node server.js
// // 10054  git init
// // 10055  git status
// // 10056  git add -A
// // 10057  git commit -am "first commit"


// // 10063  git remote add origin https://github.com/vladimirsan/mongodb-class.git
// // 10064  git status
// // 10065  git commit -am 'changes to server.js'
// // 10066  git push -u origin maino



// // create user
// // add roles (read and write to your db)
// // go to cluster
// // click connect
// // make sure you click 'driver and client libraries'
// // select Javascript and Mongoose
// // copy the connection string on the bottom
// // bring that into .env

// // URL = Uniform Resource Locator
// // URI = Uniform Resource Identifier




// process.loadEnvFile(__dirname + "/.env");
// const express = require('express');
// const mongoose = require('mongoose');
// const server = express();
// const PORT = 3100;
// // Allows the server to parse JSON data in the request body
// server.use(express.json()); // Create a new question in the database   
// const Questions = mongoose.model("Questions", new mongoose.Schema({ text: String }));

// server.post("/questions", async (request, response) => {
//     console.log(request.body.question);
   
//     // Create a new question in the database
//     // This line is going to the internet and creating a value in the database
//     await Questions.create({text: request.body.question});
//     response.status(201).send(); // No content -> Often use for creation
// });

// server.listen(PORT, async () => {
//     console.log("Server is Ready!");
//     console.log("My Mongo URI is", process.env.MONGO_URI);
//    await mongoose.connect(process.env.MONGO_URI, { 
//         dbName: "class_20_questions" });
// });


process.loadEnvFile(__dirname + "/.env"); //!

const express = require("express");
const mongoose = require("mongoose");

const server = express();
const PORT = 3100;

// ALlows me to have json as a request body
server.use(express.json());
const Questions = mongoose.model("Question", new mongoose.Schema({text:String}));

server.post("/questions", async (request, response) => {
    console.log(request.body.question);

    // we use new because mongoose.Schema is a 'factory' of objects (i.e a Class)

    // I'm going to create a new value in the database that looks like this {text: "What is your name?"}
    // This line is going to the internet and creating a value in the cloud
    // stop everything here until you get your response from the internet
    await Questions.create({text: request.body.question});

    response.status(201).send(); // No Content -> Often use for creation
});

server.listen(PORT, () => {
    console.log("Server is Ready!");
    console.log("My Mongo URI is", process.env.MONGO_URI); //!

    mongoose.connect(process.env.MONGO_URI, {
        dbName: "class19_questions"
    });
});