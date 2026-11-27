// make sure your .env has the right format
// MONGO_URI=bla bla

process.loadEnvFile(__dirname + "/.env"); //!

const express = require("express");
const mongoose = require("mongoose");

const server = express();
const PORT = 3100;


// ---------------------------------------------------------------------------------------------
// BEFORE
// Server.use is used to register middleware
server.use(express.json());

// middleware are just functions with specific shapes
function requestLoggerMiddleware(request, response, next) {
  console.log(`Log Record: ${request.method} ${request.path}`);
    //   return response(404).send(); // Research - Why did this line break?
  next();
}

server.use(requestLoggerMiddleware);

const questionSchema = new mongoose.Schema({
    question:String,
    answer:String
}); // shape of the data

const Questions = mongoose.model("Question", questionSchema); // helper to create data in that shape

// ---------------------------------------------------------------------------------------------
// handler
server.get(
    '/questions', 
    async (request, response) => {
        const data = await Questions.find();
        response.send(data);
    }
);

// handler
server.get('/questions/:id', async (request, response, next) => {
    try{
        console.log(`The id from the client is ${request.params.id}`)
        const questionFound = await Questions.findById(request.params.id);

        console.log(questionFound);

        // ....
        // ....
        // ....
        // ....
        // ....
        // ....
        // ....
        // ....
        // ....
        // ....
        // ....

        response.json(questionFound);
    }catch(e){
        next(e);
    }
});


// you'll need the GET paths to be able to test this properly in postman
// build this put handler and a delete handler
// handler
server.put('/questions/:id', async (request, response) => {
    const isInvalidBody = !mongoose.isValidObjectId(request.params.id) 
    || typeof request.body.question !== 'string' 
    || typeof request.body.answer !== 'string';

    if (isInvalidBody) {
        return response.status(400).json({ error: "Invalid Question" });
    }

    const questionFound = await Questions.findById(request.params.id);
    // if (questionFound === undefined) {
    if (!questionFound) {
        return response.status(404).send();
    }

    questionFound.question = request.body.question;
    questionFound.answer = request.body.answer;

    // try/catch
    await questionFound.save();
    response.json(questionFound);
});

server.delete('/questions/:id', () => {
    //   await bookFound.deleteOne();
});


// This will be used to create entities
server.post("/questions", async (request, response) => {
    console.log(request.body.question);

    // we use new because mongoose.Schema is a 'factory' of objects (i.e a Class)

    // I'm going to create a new value in the database that looks like this {text: "What is your name?"}
    // This line is going to the internet and creating a value in the cloud
    // stop everything here until you get your response from the internet

    const documentIJustCreated = await Questions.create({
        question: request.body.question, answer: 'Do not know (yet...)'
    });

    response.status(201).json(documentIJustCreated); // No Content -> Often use for creation
});

// ---------------------------------------------------------------------------------------------
// AFTER

// use -> middleware
server.use((error, request, response, next) => { // this is an error middleware because it has four arguments
  console.log(error);
  response.status(500).json({ error: " ACME CORP - Something went wrong with the application" });
});


server.listen(PORT, () => {
    console.log("Server is Ready!");
    console.log("My Mongo URI is", process.env.MONGO_URI); //!

    // A database is bunch of 'Collections'
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "class19_questions"
    });
});

// ---------------------------------------------------------------------------------------------