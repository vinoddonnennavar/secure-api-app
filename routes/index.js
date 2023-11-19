const express = require('express');
const authController = require('../controllers/authController');
const appController = require('../controllers/appController');
const { EXTENDED_URL_CONSTANTS } =  require('../constants/constants.js');

const router = express.Router();
router.use(EXTENDED_URL_CONSTANTS.AUTH, authController);
router.use(EXTENDED_URL_CONSTANTS.APP, appController);

module.exports = router;
