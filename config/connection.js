const mongoose = require("mongoose");

const connection = (url) => {
  const db = mongoose.createConnection(url);
  db.on("error", (err) => {
    console.log(`Error ${err}while connecting DB`);
  });

  db.on("connected", () => {
    console.log("Database connected successfully");
  });

  db.on("disconnected", () => {
    console.log("database disconnected");
  });

  return db;
};

const dbConnection = connection(process.env.MONGO_URL);
module.exports = { dbConnection };
