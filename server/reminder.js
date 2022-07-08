const Connection = require("./Connection");

const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const reminderSchema = new mongoose.Schema({
  Title: String,
  Message: String,
  SendTime: Date,
  UserId: String,
  CreatedOn: { type: Date, default: Date.now },
  ModifiedOn: { type: Date, default: Date.now },
  Status: String,
});

const reminderModel = mongoose.model("reminders", reminderSchema);

router.get("/", (req, res, next) => {
  Connection().then(() => {
    reminderModel
      .find()
      .then((reminders) => {
        res.send({ reminders }).status(200);
      })
      .catch((error) => {
        res.send({ message: "Could not load reminders" }).status(400);
      });
  });
});

router.post("/add", (req, res, next) => {
  Connection().then(() => {
    const reminder = new reminderModel(req.body);
    reminder.save((error, success) => {
      if (error) {
        res.send({ message: "Error in saving reminder" }).status(400);
      }
      res.send({ message: "Reminder saved successfully" }).status(201);
    });
  });
});

module.exports = router;
