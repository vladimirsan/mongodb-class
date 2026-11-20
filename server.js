const express = require("express");

const server = express();
const PORT = 3100;

server.listen(PORT, () => {
    console.log("Server is Ready!");
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