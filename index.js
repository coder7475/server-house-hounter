// modules
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const userModel = require("./model/user");
// Declaration
const app = express();
const port = process.env.PORT | 3000;
const uri = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.xjslrno.mongodb.net/phone-hunter?retryWrites=true&w=majority`;
const JWT_SECRET = `${process.env.SECRET}`;
// middlewares
app.use(express.json());
app.use(cors());

// connection to mongodb
main().catch((err) => console.log(err));
async function main() {
  // await mongoose.connect('mongodb://127.0.0.1:27017/test');

  await mongoose.connect(uri);
  console.log("Conected to MongoDB!");

  // registration api
  app.use("/v1/api/register", async (req, res) => {
    const user = req.body;
    const { password: myPlaintextPassword } = req.body;
    const hash = bcrypt.hashSync(myPlaintextPassword, 10);

    if (!user.fullName || typeof user.fullName !== "string") {
      return res.json({ status: "error", error: "Invalid Username!" });
    }
    if (!user.role || typeof user.role !== "string") {
      return res.json({ status: "error", error: "Invalid Role!" });
    }
    if (!myPlaintextPassword || typeof myPlaintextPassword !== "string") {
      return res.json({ status: "error", error: "Invalid password" });
    }

    if (myPlaintextPassword.length < 6) {
      return res.json({
        status: "error",
        error: "Password too small. Should be atleast 6 characters",
      });
    }

    // Store hash in your password DB.
    // if (err) console.log(err);
    // else console.log(hash)
    // console.log(user);
    user["password"] = hash;
    // console.log(user);
    try {
      const response = await userModel.create(user);
      // console.log("User created successfully", response);
    } catch (error) {
      console.log(error);
      if (error.code === 11000)
        return res.json({ status: "error", error: "User already exits!" });
      throw error;
    }

    res.json({ status: "ok" });
  });

  // login
  app.post("/v1/api/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).lean();
    console.log(user);
    if (!user)
      return res.json({ status: "error", error: "Invalid email/password" });

    if (await bcrypt.compare(password, user.password)) {
      // the username, password combination is successful
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        JWT_SECRET
      );
      console.log(token);
      return res.json({ status: "ok", data: token });
    }

    res.json({ status: "error", error: "Invalid username/password" });
  });
}

app.get("/", (req, res) => {
  res.send("I am backend for phone hunter!");
});

app.listen(port, () => {
  console.log(`Phone Hunter app listening on port ${port}`);
});
