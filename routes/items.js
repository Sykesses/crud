const express = require("express");
const router = express.Router();
const { v4: uuidv4, validate: uuidValidate } = require("uuid");

let users = [
  {
    id: uuidv4(),
    username: "John Doe",
    age: 30,
    hobbies: ["reading", "hiking"],
  },
  {
    id: uuidv4(),
    username: "Alice Smith",
    age: 25,
    hobbies: ["swimming", "painting"],
  },
  {
    id: uuidv4(),
    username: "Bob Johnson",
    age: 40,
    hobbies: ["cooking", "gardening"],
  },
  {
    id: uuidv4(),
    username: "Michael Wilson",
    age: 28,
    hobbies: ["running", "photography"],
  },
  {
    id: uuidv4(),
    username: "Emily Brown",
    age: 35,
    hobbies: ["playing guitar", "traveling"],
  },
];

router.get("/", function (req, res) {
  res.status(200).json(users);
});

router.get("/:userId", (req, res) => {
  const { userId } = req.params;
  if (!uuidValidate(userId)) {
    return res.status(400).json({ message: "Invalid userId" });
  }
  const user = users.find((user) => user.id === userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
});

router.post("/", function (req, res) {
  let newItem = {
    id: uuidv4(),
    username: req.body.username,
    age: req.body.age,
    hobbies: req.body.hobbies,
  };

  users.push(newItem);
  res.status(201).json(newItem);
});

router.put("/:id", function (req, res) {
  const { id } = req.params;
  const foundIndex = users.findIndex((item) => item.id === id);

  if (foundIndex === -1) {
    return res.status(400).send("Invalid user id");
  }

  users[foundIndex] = {
    ...users[foundIndex],
    ...req.body,
  };

  res.sendStatus(204);
});

router.delete("/:id", function (req, res) {
  const { id } = req.params;
  const foundIndex = users.findIndex((item) => item.id === id);

  if (foundIndex === -1) {
    return res.status(400).send("Invalid user id");
  }

  users.splice(foundIndex, 1);
  res.sendStatus(204);
});

module.exports = router;
