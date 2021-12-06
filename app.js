const express = require("express");
const config = require("config");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

app.use("/api/posts", require("./routes/posts.route"));

const PORT = config.get("port") || 5000;

const startApp = async () => {
  try {
    await mongoose.connect(config.get("mongoURI"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () =>
      console.log(`Blog server started on port ${PORT}...`)
    );
  } catch (e) {
    console.log(`Server error: ${e.message}`);
    process.exit(1);
  }
};

startApp();
