const express = require("express");
const router = express.Router();

let characters = [
  {
    Name: "Nobita",
    height: 5.6,
    id: 1,
  },

  {
    Name: "Sunio",
    height: 5.2,
    id: 2,
  },

  {
    Name: "Doraemon",
    height: 3.4,
    id: 3,
  },

  {
    Name: "Gian",
    height: 6.4,
    id: 4,
  },
];

router.get("/", (req, res) => {
  res.send(characters);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  let filtered_char = characters.filter((ch) => ch.id == id);

  res.send(filtered_char);
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  characters = characters.filter((ch) => ch.id != id);

  res.send(`Character with id ${id} deleted ........`);
});

router.post("/", (req, res) => {
  characters.push({
    Name: req.query.Name,

    height: req.query.height,

    id: req.query.id,
  });

  res.send(`Character ${req.query.Name} has been Created.....`);
});

router.put("/:id", (req, res) => {
  const id = req.params.id;

  let filtered_char = characters.filter((ch) => ch.id == id);

  if (filtered_char.length > 0) {
    let filter_char = filtered_char[0];

    let height = req.query.height;

    let Name = req.query.Name;

    if (height) {
      filter_char.height = height;
    }

    if (Name) {
      filter_char.Name = Name;
    }

    characters = characters.filter((ch) => ch.id != id);

    characters.push(filter_char);

    res.send(`Character with id ${id} updated.......`);
  } else {
    res.send("Character to find the character.....");
  }
});

module.exports = router;
