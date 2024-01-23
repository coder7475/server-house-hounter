// modules
require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const userModel = require('./model/user');
// Declaration
const app = express();
const port = process.env.PORT | 3000;
const uri = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.xjslrno.mongodb.net/phone-hunter?retryWrites=true&w=majority`;

// middlewares
app.use(express.json());
app.use(cors());

// connection to mongodb
main().catch(err => console.log(err));
async function main() {
    // await mongoose.connect('mongodb://127.0.0.1:27017/test');
  
    await mongoose.connect(uri);
    console.log("Conected to MongoDB!")

    // registration api
    app.use("/v1/api/register", async(req, res) => {
      console.log(req.body);
      res.json({ status: "ok" })
    })
}

app.get("/", (req, res) => {
  res.send("I am backend for phone hunter!");
});

app.listen(port, () => {
  console.log(`Phone Hunter app listening on port ${port}`);
});

