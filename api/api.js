function weatherURI(city) {
    return `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric${WEATHER_API_KEY}`
}
const WEATHER_API_KEY = '&appid=84e978d8225ff39f036b3696857b3c50'
const CURRENCY_API_KEY = 'access_key=2e4d5e6e4d5e'

module.exports = {weatherURI, CURRENCY_API_KEY};