// const express = require("express");
// const routes = require("./routes/routing.js");
// const routes2 = require("./routes/routes2");
// // const cors = require("cors");

// const app = express();

// const Port = 4000;

// // app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// // app.use(cors());
// app.use("/angular", routes);
// app.use("/dictionary", routes2);

// app.listen(Port, () => {
//   console.log("Server is running on port " + Port);
// });
const express = require("express");

const routes = require("./routes/routes2.js");

const jwt = require("jsonwebtoken");

const session = require("express-session");

const app = express();

const Port = 4000;
app.use(express.json());

app.use(
  session(
    { secret: "SomeComplexString" },
    (resave = true),
    (saveUnitialized = true)
  )
);

app.use("/members", (req, res, next) => {
  if (req.session.authorization) {
    token = req.session.authorization["accessToken"];

    jwt.verify(token, "access", (err, user) => {
      if (!err) {
        req.user = user;

        next();
      } else {
        return res.status(403).json({ message: "User not authenticated" });
      }
    });
  } else {
    return res.status(403).json({ message: "User not logged In" });
  }
});

app.use("/members", routes);

let users = [];

const authenticatedUser = (username, password) => {
  let validUser = users.filter(
    (user) => user.username === username && user.password === password
  );

  if (validUser.length > 0) {
    return true;
  } else {
    false;
  }
};

const doesExist = (username) => {
  let userWithUsername = users.filter((user) => user.username === username);

  if (userWithUsername.length > 0) {
    return true;
  } else {
    return false;
  }
};

app.post("/register", (req, res) => {
  let username = req.body.username;

  let password = req.body.password;

  if (username && password) {
    if (!doesExist(username)) {
      users.push({ username: username, password: password });

      return res
        .status(200)
        .json({ message: "User successfull Register......" });
    } else {
      return res.status(404).json({ message: "User already Exists...." });
    }
  }

  return res.status(404).json({ message: "Unable to Register........" });
});

app.post("/login", (req, res) => {
  const username = req.body.username;

  const password = req.body.password;

  if (!username || !password) {
    return res.status(404).json({ message: "Error Loggin In........." });
  }

  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign(
      {
        data: password,
      },
      "access",
      { expiresIn: 60 * 60 }
    );

    req.session.authorization = {
      accessToken,
      username,
    };

    return res
      .status(200)
      .json({ message: "User Logged In Successfully........." });
  } else {
    return res
      .status(400)
      .json({ message: "Invalid Login .... Check Username and Password" });
  }
});

app.listen(Port, () => {
  console.log("Server is running on port " + Port);
});
