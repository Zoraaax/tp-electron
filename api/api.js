function weatherURI(city) {
    return `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric${WEATHER_API_KEY}`
}
const WEATHER_API_KEY = '&appid=84e978d8225ff39f036b3696857b3c50'

module.exports = {weatherURI};