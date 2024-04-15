const express = require("express");

const mysql = require("mysql2");

const bodyParser = require("body-parser");

const app = express();

const port = 3000;

const connection = mysql.createPool({
  host: "127.0.0.1",

  port: "3306",

  user: "root",

  password: "Vansh9415@",

  database: "Emp",
});
app.use(bodyParser.json());

connection.getConnection((err, connection) => {
  if (err) {
    console.error("Error Connecting to MySQL....");

    return;
  }

  console.log("Connected to MYSQL database........");
});

app.get("/users", (req, res) => {
  connection.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.error("Error Fetching Users...");

      res.status(500).json({ error: "Error Fetching Users..." });

      return;
    }

    res.json(result);
  });
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  connection.query("SELECT * FROM users WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Error Fetching Users...");

      res.status(500).json({ error: "Error Fetching Users..." });

      return;
    }

    res.json(result);
  });
});

app.delete("/users", (req, res) => {
  const id = req.body.id;
  connection.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Error Fetching Users...");

      res.status(500).json({ error: "Error Fetching Users..." });

      return;
    }

    res.status(200).json({ message: "Deleted Successfully...." });
  });
});

app.put("/users/:id", (req, res) => {
  const id = req.params.id;
  const { username, email, age, tech } = req.body;

  if (email) {
    connection.query(
      "UPDATE users SET email = ? WHERE id = ?",
      [email, id],
      (err, result) => {
        if (err) {
          console.error("Error Fetching Users...");

          res.status(500).json({ error: "Error Fetching Users..." });

          return;
        }

        res.status(200).json({ message: "Updated Successfully...." });
      }
    );
  }
  if (username) {
    connection.query(
      "UPDATE users SET username = ? WHERE id = ?",
      [username, id],
      (err, result) => {
        if (err) {
          console.error("Error Fetching Users...");

          res.status(500).json({ error: "Error Fetching Users..." });

          return;
        }

        res.status(200).json({ message: "Updated Successfully...." });
      }
    );
  }
  if (age) {
    connection.query(
      "UPDATE users SET age = ? WHERE id = ?",
      [age, id],
      (err, result) => {
        if (err) {
          console.error("Error Fetching Users...");

          res.status(500).json({ error: "Error Fetching Users..." });

          return;
        }

        res.status(200).json({ message: "Updated Successfully...." });
      }
    );
  }
  if (tech) {
    connection.query(
      "UPDATE users SET tech = ? WHERE id = ?",
      [username, id],
      (err, result) => {
        if (err) {
          console.error("Error Fetching Users...");

          res.status(500).json({ error: "Error Fetching Users..." });

          return;
        }

        res.status(200).json({ message: "Updated Successfully...." });
      }
    );
  }
});

app.post("/users", (req, res) => {
  const { username, email, age, tech } = req.body;

  if (!username || !email || !age || !tech) {
    res.status(400).json({ error: "All fields are Required...." });

    return;
  }

  connection.query(
    "INSERT INTO users (username , email, age, tech) VALUES (?,?,?,?)",
    [username, email, age, tech],
    (err, result) => {
      if (err) {
        console.error("Error Inserting User...");

        res.status(500).json({ error: "Error Inserting  User..." });

        return;
      }

      res.status(200).json({ message: "User Inserted Successfully...." });
    }
  );
});

app.get("/user/sort", (req, res) => {
  connection.query("SELECT * FROM users ORDER BY age DESC", (err, result) => {
    if (err) {
      console.error("Error Fetching Users...");

      res.status(500).json({ error: "Error Fetching Users..." });

      return;
    }

    res.json(result);
  });
});

app.get("/user/max", (req, res) => {
  connection.query(
    "select MAX(age), tech FROM users group by tech having MAX(age)>=25",
    (err, result) => {
      if (err) {
        console.error("Error Fetching Users...");

        res.status(500).json({ error: "Error Fetching Users..." });

        return;
      }

      res.json(result);
    }
  );
});

app.get("/user/avg", (req, res) => {
  connection.query("select AVG(age) FROM users", (err, result) => {
    if (err) {
      console.error("Error Fetching Users...");

      res.status(500).json({ error: "Error Fetching Users..." });

      return;
    }

    res.json(result);
  });
});

app.get("/user/count", (req, res) => {
  connection.query(
    "select tech, COUNT(*) FROM users group by tech",
    (err, result) => {
      if (err) {
        console.error("Error Fetching Users...");

        res.status(500).json({ error: "Error Fetching Users..." });

        return;
      }

      res.json(result);
    }
  );
});

app.get("/user/subquery", (req, res) => {
  connection.query(
    "select username FROM users where age > (select AVG(age) from users)",
    (err, result) => {
      if (err) {
        console.error("Error Fetching Users...");

        res.status(500).json({ error: "Error Fetching Users..." });

        return;
      }

      res.json(result);
    }
  );
});
app.listen(port, () => {
  console.log(`Server running on Port ${port}........`);
});
