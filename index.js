const express = require("express");
const app = express();
const reminderRouter = require("./server/reminder");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());
app.use(bodyParser());
app.use(express.static("build"));
app.use("/reminder", reminderRouter);
app.get("app/*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});
app.listen(5000, () => {
  console.log("server started on port 5000");
});
