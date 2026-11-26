// make sure your .env has the right format
// MONGO_URI=bla bla

process.loadEnvFile(__dirname + "/.env"); //!

const express = require("express");
const mongoose = require("mongoose");

const server = express();
const PORT = 3100;


// ALlows me to have json as a request body
server.use(express.json());

function requestLoggerMiddleware(request, response, next) {
  console.log(`${request.method} ${request.path}`);
  next();
}

server.use(requestLoggerMiddleware);

const questionSchema = new mongoose.Schema({
    question:String,
    answer:String
}); // shape of the data

const Questions = mongoose.model("Question", questionSchema); // helper to create data in that shape

server.get(
    '/questions', 
    async (request, response) => {
        const data = await Questions.find();
        response.send(data);
    }
);

server.get('/questions/:id', async (request, response) => {
    try{
        console.log(`The id from the client is ${request.params.id}`)
        const questionFound = await Questions.findById(request.params.id);

        console.log(questionFound);

        response.json(questionFound);
    }catch(e){
        console.log(e);
        response.status(400).send();
    }
});

server.put('/questions/:id', async (request, response) => {
    const isInvalidBody = !mongoose.isValidObjectId(request.params.id) || typeof request.body.question !== 'string' || typeof request.body.answer !== 'string';

    if (isInvalidBody) {
        return response.status(400).json({ error: "Invalid Question" });
    }

    const questionFound = await Questions.findById(request.params.id);
    if (!questionFound) {
        return response.status(404).send();
    }

    questionFound.question = request.body.question;
    questionFound.answer = request.body.answer;

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

app.use((error, request, response, next) => {
  console.error(error);
  response.status(500).json({ error: "Something went wrong with the application." });
});


server.listen(PORT, () => {
    console.log("Server is Ready!");
    console.log("My Mongo URI is", process.env.MONGO_URI); //!

    // A database is bunch of 'Collections'
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "class19_questions"
    });
});
