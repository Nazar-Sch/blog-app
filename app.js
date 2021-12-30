const express = require("express");
const app = express();

const { richValidationError, errorHandler } = require("./middleware/error");

const run = async () => {
  require("dotenv").config();
  require("./config/db").connect();

  app.use(express.json());

  const { API_PORT } = process.env;

  app.use(express.json());

  require("./routes")(app);

  const PORT = API_PORT || 5000;

  app.listen(PORT, () => console.log(`Blog server started on port ${PORT}...`));

  app.use(richValidationError, errorHandler);
};

run();
