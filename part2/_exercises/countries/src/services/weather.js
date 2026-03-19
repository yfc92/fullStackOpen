import axios from 'axios'

const url = "https://openweathermap.org"

const apiUrl = "https://api.openweathermap.org"

const api_key = import.meta.env.VITE_APP_OPENWEATHERMAP_API_KEY

//Sample data
// {
//   "coord": {
//     "lon": 24.9355,
//     "lat": 60.1695
//   },
//   "weather": [
//     {
//       "id": 800,
//       "main": "Clear",
//       "description": "clear sky",
//       "icon": "01n"
//     }
//   ],
//   "base": "stations",
//   "main": {
//     "temp": 275.46,
//     "feels_like": 271.42,
//     "temp_min": 274.69,
//     "temp_max": 276.51,
//     "pressure": 1016,
//     "humidity": 94,
//     "sea_level": 1016,
//     "grnd_level": 1014
//   },
//   "visibility": 10000,
//   "wind": {
//     "speed": 4.47,
//     "deg": 260,
//     "gust": 4.92
//   },
//   "clouds": {
//     "all": 0
//   },
//   "dt": 1773943218,
//   "sys": {
//     "type": 2,
//     "id": 2011913,
//     "country": "FI",
//     "sunrise": 1773894342,
//     "sunset": 1773937830
//   },
//   "timezone": 7200,
//   "id": 658225,
//   "name": "Helsinki",
//   "cod": 200
// }

const getWeather = (locationName) =>{
    const weatherApiUrl = `${apiUrl}/data/2.5/weather?q=${locationName}&units=metric&appid=${api_key}`
    return( 
        axios
            .get(weatherApiUrl)
            .then(response => {
                // console.log("raw weather response", response.data)
                let weatherData = response.data
                const iconName = weatherData.weather[0].icon
                return(
                {
                   locationName: locationName,
                   temperature: weatherData.main.temp,
                   windSpeed: weatherData.wind.speed,
                   iconUrl: `${url}/img/wn/${iconName}@4x.png`
                })
            })
    )
}

export default{
    getWeather,
}