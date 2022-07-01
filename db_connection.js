const mongoose = require("mongoose");

module.exports.db_connect = async (URL) => {
  mongoose
    .connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      // we need .then because
      //it returns a promise
      console.log("Database is connected...");
    })
    .catch((error) => {
      console.log("Error:", error.message);
    });
};
