const express = require("express");

const mongoose = require("mongoose");

const app = express();

mongoose.connect(
  "mongodb+srv://vanshmisra2:Vansh9415@cluster0.r4y4zjw.mongodb.net/angularteam"
);

const db = mongoose.connection;

db.on("error", () => {
  console.log("MongoDb connection error.....");
});

const userSchema = new mongoose.Schema({
  name: String,
  phone: Number,
  age: Number,
  tech: String,
  email: String,
});

const User = mongoose.model("User", userSchema);
app.use(express.json());

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();

    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});
app.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);

    await user.save();

    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}....`);
});
