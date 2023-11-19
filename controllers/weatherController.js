const express = require('express');
const WeatherService = require('../services/weatherService');
const { EXTENDED_URL_CONSTANTS, URL, MESSAGE } =  require('../constants/constants.js');
const apiKey = process.env.OPENWEATHERMAP_API_KEY;

if (!apiKey) {
  process.exit(1); // Exit the process if the API key is missing
}
const router = express.Router();

router.get(EXTENDED_URL_CONSTANTS.WEATHER_CURRENT, async (req, res) => {
  const { zipCode } = req.query;
  if (!zipCode) {
    return res.status(400).json({ error: MESSAGE.ZIPCODE_REQUIRED });
  }
  try {
    const weatherService = new WeatherService(apiKey);
    const currentWeather = await weatherService.getCurrentWeather(zipCode, apiKey);
    res.status(200).json(currentWeather);
  } catch (error) {
    res.status(500).json({ error: MESSAGE.SERVER_ERROR });
  }
});

router.get(EXTENDED_URL_CONSTANTS.WEATHER_YESTERDAY, async (req, res) => {
  const { zipCode, appid } = req.query;
  if (!zipCode) {
    return res.status(400).json({ error: MESSAGE.ZIPCODE_REQUIRED });
  }
  try {
    const weatherService = new WeatherService(appid);
    const yesterdayWeather = await weatherService.getYesterdayWeather(zipCode, apiKey);
    res.status(200).json(yesterdayWeather);
  } catch (error) {
    res.status(500).json({ error: MESSAGE.SERVER_ERROR });
  }
});

router.post(EXTENDED_URL_CONSTANTS.WEATHER_FOR_ALL, async (req, res) => {
  try {
    const { zipCodes, appid } = req.body;
    const weatherService = new WeatherService(appid);

    if (!zipCodes || !Array.isArray(zipCodes) || zipCodes.length === 0) {
      return res.status(400).json({ message: MESSAGE.ZIPCODE_ARRAY_ERROR });
    }

    // Use Promise.all to fetch weather data for all zip codes concurrently
    const weatherPromises = zipCodes.map((zipCode) => weatherService.getWeather(zipCode));
    const weatherResults = await Promise.all(weatherPromises);

    res.status(200).json({ weatherResults });
  } catch (error) {
    res.status(500).json({ message: MESSAGE.SERVER_ERROR });
  }
});

module.exports = router;
