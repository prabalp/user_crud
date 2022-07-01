const express = require("express");
const app = express();
const router = require("express").Router();

const bodyParser = require("body-parser");
const cors = require("cors");
const { db_connect } = require("./db_connection");

require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userRouter = require("./routes/user_routes");

//env var
const URL = process.env.MONGODB_URI;
const port = process.env.PORT || 3000;

// routes
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("USER_CRUD API");
});

app.listen(port, () => {
  console.log(`Server is running on PORT: ${port}`);
  db_connect(URL);
});
