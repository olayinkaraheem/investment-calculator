const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const calculator = require("./controllers/calculator");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("Olayinka Raheem says Welcome To my investment calculator app!");
});
app.post("/calculate", (req, res) => {
  calculator.calculateInvestment(req, res);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
