const express = require("express");
const router = express.Router();

let members = {
  "vansh1@gmail.com": {
    firstname: "Vansh",
    lastname: "Misra",
    age: 23,
  },

  "nitanshi2@gmail.com": {
    firstname: "Nitanshi",
    lastname: "Agarwal",
    age: 22,
  },
  "disha4@gmail.com": {
    firstname: "Disha",
    lastname: "Sachdeva",
    age: 22,
  },
};
router.get("/", (req, res) => {
  res.send(members);
});

router.get("/:email", (req, res) => {
  const email = req.params.email;
  res.send(members[email]);
});
router.post("/", (req, res) => {
  const email = req.body.email;
  console.log(req.body);
  if (email) {
    members[email] = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      age: req.body.age,
    };
  }

  res.send(`Member ${req.body.firstname} has been Created.....`);
});
router.delete("/:email", (req, res) => {
  const email = req.params.email;
  delete members[email];
  res.send(`Member with email ${email} deleted ........`);
});
router.put("/:email", (req, res) => {
  const email = req.params.email;
  console.log(req.body);
  let member = members[email];
  if (member) {
    let age = req.body.age;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    if (age) {
      member["age"] = age;
    }
    if (firstname) {
      member["firstname"] = firstname;
    }
    if (lastname) {
      member["lastname"] = lastname;
    }

    members[email] = member;
    res.send(`Member with email ${email} updated.......`);
  } else {
    res.send("Unable to find the Member.....");
  }
});
module.exports = router;
