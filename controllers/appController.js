const express = require("express");
const jwt = require("jsonwebtoken");
const { EXTENDED_URL_CONSTANTS, MESSAGE } =  require('../constants/constants.js')

const router = express.Router();

// Middleware to verify the JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  // console.log('token ;--', token);

  if (!token) {
    return res.status(401).json({ message: MESSAGE.UNAUTHORIZED });
  }

  jwt.verify(`${token}`, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: MESSAGE.INVALID_TOKEN });
    }
    req.userData = decoded;
    next();
  });
};

router.get(EXTENDED_URL_CONSTANTS.SECURE_ENDPOINT, verifyToken, (req, res) => {
  res.status(200).json({ message: MESSAGE.SECURE_API_MESSAGE });
});

module.exports = router;
