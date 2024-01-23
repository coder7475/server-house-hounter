// modules
require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');

// Declaration
const app = express();
const port = 3000;
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
    
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Phone Hunter app listening on port ${port}`);
});

