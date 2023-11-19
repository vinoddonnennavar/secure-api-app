const EXTENDED_URL_CONSTANTS = {
    APP: '/app',
    AUTH : '/auth',
    WEATHER : '/weather',
    API : '/api',
    LOGIN : '/login',
    REGISTER: '/register',
    SECURE_ENDPOINT : '/secure-endpoint',
    WEATHER_HISTORY : '/history',
    WEATHER_CURRENT : '/current',
    WEATHER_YESTERDAY : '/yesterday',
    WEATHER_FOR_ALL : '/weather-for-all'
}
const URL = {
    BASE_URL : 'http://localhost',
    OPEN_WEATHER_API : 'https://api.openweathermap.org/data/2.5',
    DB_PATH : 'mongodb://127.0.0.1:27017/secure-api-app-db',
    TEST_DB_PATH : 'mongodb://127.0.0.1:27017/secure-api-app-db-test'
}
const MESSAGE = {
    USER_EXISTS : 'Username already exists',
    REGISTERED_USER : 'User registered successfully',
    SERVER_ERROR : 'Internal server error',
    INVALID_CREDS : 'Invalid credentials',
    INVALID_TOKEN : 'Invalid token',
    SECURE_API_MESSAGE : 'This is a secure endpoint',
    UNAUTHORIZED: 'Unauthorized',
    WEATHER_CURRENT_FETCH_ERROR : 'Error fetching current weather data',
    WEATHER_YESTERDAY_FETCH_ERROR : 'Error fetching yesterday\'s weather data',
    WEATHER_HISTORY_FETCH_ERROR : 'Error fetching historical weather data',
    ZIPCODE_REQUIRED : 'ZIP Code is required',
    DB_CONN_SUCCESS : 'Database connected:',
    DB_CONN_ERR : 'connection error:',
    ZIPCODE_ARRAY_ERROR: 'Invalid input. Please provide an array of zip codes.'
}
module.exports = {
    EXTENDED_URL_CONSTANTS,
    URL,
    MESSAGE
}
