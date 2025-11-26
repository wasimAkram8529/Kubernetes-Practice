const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello from Node Backend!");
});

app.get("/api", (req, res) => {
  res.json({ message: "API working successfully!" });
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
