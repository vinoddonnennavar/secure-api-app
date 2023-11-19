const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { EXTENDED_URL_CONSTANTS, MESSAGE } =  require('../constants/constants.js')

const router = express.Router();

router.post(EXTENDED_URL_CONSTANTS.REGISTER, async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: MESSAGE.USER_EXISTS });
    }
    
    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({ message: MESSAGE.REGISTERED_USER });
  } catch (error) {
    res.status(500).json({ message: MESSAGE.SERVER_ERROR });
  }
});

router.post(EXTENDED_URL_CONSTANTS.LOGIN, async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: MESSAGE.INVALID_CREDS });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: MESSAGE.INVALID_CREDS });
    }

    const token = jwt.sign({ username: user.username, userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: MESSAGE.SERVER_ERROR });
  }
});

module.exports = router;
