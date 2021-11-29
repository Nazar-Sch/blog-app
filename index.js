const express = require("express");
const config = require("config");

const app = express();

app.get("/", function (req, res) {
  res.send("Hello World");
});

const PORT = config.get("port") || 5000;

app.listen(PORT, () => {
  console.log(`Blog server started on port ${PORT}...`);
});
