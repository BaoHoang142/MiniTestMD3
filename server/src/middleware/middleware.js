//validate
const fs = require("fs");
const readData = fs.readFileSync("db.json");
const data = JSON.parse(readData);
const validation = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({
      message: "Todo is required",
    });
  } else {
    var nameCheck = data.todoList.find(
      (e) => e.name.toLowerCase() == name.toLowerCase()
    );
    if (nameCheck) {
      res.status(400).json({
        message: "Todo already exists",
      });
    } else {
      next();
    }
  }
};
module.exports = {
  validation,
};
