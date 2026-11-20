const express = require("express");

const server = express();
const PORT = 3100;

server.listen(PORT, () => {
    console.log("Server is Ready!");
});