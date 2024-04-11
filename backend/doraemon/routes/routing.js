const express = require("express");
const router = express.Router();

let gadgets = [
  {
    Name: "Anywhere Door",
    color: "red",
    id: 1,
  },

  {
    Name: "Bamboocopter",
    color: "yellow",
    id: 2,
  },

  {
    Name: "Big Light",
    color: "white",
    id: 3,
  },
];

router.get("/", (req, res) => {
  res.send(gadgets);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  let filtered_gad = gadgets.filter((g) => g.id == id);

  res.send(filtered_gad);
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  gadgets = gadgets.filter((g) => g.id != id);

  res.send(`Gadget with id ${id} deleted ........`);
});

router.post("/", (req, res) => {
  gadgets.push({
    Name: req.query.Name,

    color: req.query.color,

    id: req.query.id,
  });

  res.send(`Gadget ${req.query.Name} has been Created.....`);
});

router.put("/:id", (req, res) => {
  const id = req.params.id;

  let filtered_gad = gadgets.filter((g) => g.id == id);

  if (filtered_gad.length > 0) {
    let filter_gadget = filtered_gad[0];

    let color = req.query.color;

    let Name = req.query.Name;

    if (color) {
      filter_gadget.color = color;
    }

    if (Name) {
      filter_gadget.Name = Name;
    }

    gadgets = gadgets.filter((g) => g.id != id);

    gadgets.push(filter_gadget);

    res.send(`Gadget with id ${id} updated.......`);
  } else {
    res.send("Unable to find the character.....");
  }
});

module.exports = router;
