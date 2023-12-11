var express = require("express");
var app = express();
const cors = require("cors");
app.use(cors());
const bodyParser= require("body-parser");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const todoRouter = require("./src/router/todo.Routes")

app.use("/api/v1/todo",todoRouter)




app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });