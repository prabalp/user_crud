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

//env var
const URL = process.env.MONGODB_URI;
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("USER_CRUD API");
});
