const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const path = require("path");
require("./config/connection");

const router = require("./router/index");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/test", (req, res) => {
  res.status(200).json({ message: "Server is working" });
});

app.use("/api/v1", router);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening at PORT ${process.env.PORT}`);
});
