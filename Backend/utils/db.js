const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

const DB = process.env.DB;

const dbConnection = async () => {
  try {
    await mongoose.connect(DB).then(() => {
      console.log("Database connection successful");
    });
  } catch (error) {
    console.log(error);
    setTimeout(dbConnection, 5000);
  }
};

module.exports = dbConnection;
