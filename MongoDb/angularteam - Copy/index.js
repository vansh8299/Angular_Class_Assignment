const express = require("express");

const mongoose = require("mongoose");

const { body, validationResult } = require("express-validator");

const methodOverride = require("method-override");

const app = express();

// app.use(express.static("public"));

mongoose.connect(
  "mongodb+srv://vanshmisra2:Vansh9415@cluster0.r4y4zjw.mongodb.net/angularteam"
);

const db = mongoose.connection;

db.on("error", () => {
  console.log("MongoDb connection error.....");
});
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
});

const User = mongoose.model("User", userSchema);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

app.get("/users/new", (req, res) => {
  res.render("new-user", { errors: null });
});

app.get("/users/:id/edit", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.render("edit-user", { user, errors: null });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();

    res.render("user-list", { users });
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
app.post(
  "/users",
  [
    body("name")
      .isLength({ min: 5 })
      .withMessage("Name is required with min 5 chars"),

    body("age")
      .isInt({ min: 18 })
      .withMessage("Age must be a number greater than 18"),

    body("email").isEmail().withMessage("Invalid Email address"),
  ],
  async (req, res) => {
    console.log(req.body);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("new-user", { errors: errors.array() });
    }

    try {
      const user = new User(req.body);

      await user.save();

      res.redirect("/users");
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

app.put(
  "/users/:id",
  [
    body("name")
      .isLength({ min: 5 })
      .withMessage("Name is required with min 5 chars"),

    body("age")
      .isInt({ min: 18 })
      .withMessage("Age must be a number greater than 18"),

    body("email").isEmail().withMessage("Invalid Email address"),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const user = await User.findById(req.params.id);

      return res.render("edit-user", { user, errors: errors.array() });
    }

    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });

      if (!user) {
        return res.status(404).send("User not found");
      }

      res.redirect("/users");
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

app.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.redirect("/users");
  } catch (err) {
    res.status(500).send(err);
  }
});

const port = 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}....`);
});
