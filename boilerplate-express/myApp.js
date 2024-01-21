let express = require("express");
let app = express();
let bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.sendFile(__dirname + "/views/index.html"));

app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({ message: "HELLO JSON" });
  } else {
    res.json({ message: "Hello json" });
  }
});

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({ time: req.time });
  },
);

app.get("/:word/echo", (req, res) => {
  word = req.params.word;
  res.json({ echo: word });
});

app.post("/name", (req, res) => {
  let first = req.body.first;
  let last = req.body.last;

  res.json({ name: `${first} ${last}` });
});

app.get("/name", (req, res) => {
  let first = req.query.first;
  let last = req.query.last;

  res.json({ name: `${first} ${last}` });
});

module.exports = app;
