const express = require("express");
const app = express();

const pkg = require("./package.json");
const serverPort = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    author: pkg.author,
    name: pkg.name,
    version: pkg.version
  })
});

app.listen(serverPort, () => {
  console.log(`The bot message is working on port ${serverPort}!`);
});

app.use("/linkedin", require("./app/routes"));
