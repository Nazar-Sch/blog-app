require("dotenv").config();

const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

exports.connect = async () => {
  // Connecting to the database
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (e) {
    console.log(`Database connection failed. Error message: ${e.message}.`);
    process.exit(1);
  }
};
