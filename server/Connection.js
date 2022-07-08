const mongoose = require("mongoose");
function Connection() {
  return mongoose.connect(
    "mongodb+srv://esachin:ssw1994@cluster0.xd6pt.mongodb.net/tasks?retryWrites=true&w=majority",
    {
      dbName: "remindme",
    }
  );
}

module.exports = Connection;
