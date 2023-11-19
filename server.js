const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const connectDB = require('./config/db.js');
const routes = require('./routes');
const authController = require('./controllers/authController');
const appController = require('./controllers/appController');
const weatherController = require('./controllers/weatherController');
const { EXTENDED_URL_CONSTANTS, URL } =  require('./constants/constants.js')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

connectDB();

// Use routes
app.use(EXTENDED_URL_CONSTANTS.AUTH, authController);
app.use(EXTENDED_URL_CONSTANTS.APP, appController);
app.use(EXTENDED_URL_CONSTANTS.WEATHER, weatherController);
app.use(EXTENDED_URL_CONSTANTS.API, routes);

app.listen(PORT, () => {
  console.log(`Server is running on ${URL.BASE_URL}:${PORT}`);
});
