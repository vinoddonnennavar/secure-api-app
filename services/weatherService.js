const { EXTENDED_URL_CONSTANTS, URL, MESSAGE } =  require('../constants/constants.js');
const apiKey = process.env.OPENWEATHERMAP_API_KEY;

if (!apiKey) {
  process.exit(1); // Exit the process if the API key is missing
}

class WeatherService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.apiUrl = apiUrl;
  }

  async getCurrentWeather(zipCode, apiKey) {
    try {
      const response = await fetch(`${URL.OPEN_WEATHER_API}${EXTENDED_URL_CONSTANTS.WEATHER}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          zip: zipCode,
          appid: apiKey,
        },
      });
      return response;
    } catch (error) {
      throw new Error(MESSAGE.WEATHER_CURRENT_FETCH_ERROR);
    }
  }

  async getYesterdayWeather(zipCode, apiKey) {
    // Implement logic to retrieve yesterday's weather
    // This might involve making additional requests or using historical data
    // For simplicity, let's assume you have a function to get historical data
    try {
      const yesterdayData = await this.getHistoricalWeather(zipCode, new Date().toISOString());
      return yesterdayData;
    } catch (error) {
      throw new Error(MESSAGE.WEATHER_YESTERDAY_FETCH_ERROR);
    }
  }

  // Helper function to get historical weather data (replace with actual implementation)
  async getHistoricalWeather(zipCode, date) {
    // Implement logic to retrieve historical weather data
    // This might involve making additional requests or using stored data
    // For simplicity, this is a placeholder function
    try {
      const response = fetch(`${URL.OPEN_WEATHER_API}${EXTENDED_URL_CONSTANTS.WEATHER_HISTORY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          zip: zipCode,
          date: date,
          appid: apiKey,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(MESSAGE.WEATHER_HISTORY_FETCH_ERROR);
    }
  }

  async getWeather(zipCode, apiKey) {
    try {
      const response = await axios.get(this.apiUrl, {
        params: {
          zip: zipCode,
          appid: apiKey,
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(`Error fetching weather data for ${zipCode}: ${error.message}`);
    }
  }
}

module.exports = WeatherService;
