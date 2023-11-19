const mongoose = require('mongoose');
const { URL, MESSAGE } =  require('../constants/constants.js');

const connectDB = function connectDB() {
  const url = URL.DB_PATH;

  try {
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    process.exit(1);
  }
  const dbConnection = mongoose.connection;
  dbConnection.on("open", (_) => {
    console.log(`${MESSAGE.DB_CONN_SUCCESS} ${url}`);
  });

  dbConnection.on("error", (err) => {
    console.error(`${MESSAGE.DB_CONN_ERR} ${err}`);
  });
  return;
};

module.exports = connectDB;
