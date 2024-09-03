const mongoose = require("mongoose");

let connectToMongoDb = async (url) => {
  return mongoose.connect(url);
};

module.exports = {
  connectToMongoDb,
};
