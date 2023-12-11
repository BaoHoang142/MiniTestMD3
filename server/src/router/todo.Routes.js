const express = require("express");
const router = express.Router();
const fs = require("fs");
const { validation } = require("../middleware/middleware");

// doc file db
const readData = fs.readFileSync("db.json");
const data = JSON.parse(readData);
// lay data
router.get("/", (req, res) => {
    const {per_page} = req.query
    const arr = data.todoList.slice(0,per_page);
    res.status(200).json(arr);    
});
router.post("/", validation, (req, res) => {
  data.todoList.unshift(req.body);
  fs.writeFileSync("db.json", JSON.stringify(data));
  res.status(200).json(data.todoList);
});
// edit
router.put("/:id", validation, (req, res) => {
  const { id } = req.params;
  const index = data.todoList.findIndex((item) => item.id == id);
  data.todoList[index] = req.body;
  fs.writeFileSync("db.json", JSON.stringify(data));
  res.status(201).json(data.todoList);
});

// xoa
router.delete("/:id", (req, res) => {
  const index = data.todoList.findIndex((item) => item.id == req.params.id);
  data.todoList.splice(index, 1);
  fs.writeFileSync("db.json", JSON.stringify(data));
  res.status(200).json(data.todoList);
});
// xoa het
router.delete("/", (req, res) => {
  data.todoList = [];
  fs.writeFileSync("db.json", JSON.stringify(data));
  res.status(200).json(data.todoList);
});
// line through
router.patch("/:id", (req, res) => {
    console.log(req.params);
  const index = data.todoList.findIndex((item) => item.id == req.params.id);
  data.todoList[index].completed = !data.todoList[index].completed;
  fs.writeFileSync("db.json", JSON.stringify(data));
  res.status(200).json(data.todoList);
});
router.get("/", (req, res) => {});
module.exports = router;
