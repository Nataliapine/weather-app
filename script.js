const form = document.querySelector(".input-group");
const searchLocation = document.querySelector("#search-location");
const notificationError = document.querySelector(".notification");
const locationn = document.querySelector(".location p");
const temperatureValue = document.querySelector(".temperature-value p");
const temperatureFeel = document.querySelector(".temperature-feel p");
const temperatureDescription = document.querySelector(".temperature-description p");
const temperatureWeek = document.querySelector(".days-of-the-week");
const weatherIcon = document.querySelector(".weather-icon");

const KELVIN = 273;
const key = "91fd180b353bb31f1feca2c3c3ddc00a";


window.addEventListener("load", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const urlCoordinates = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
            const currentWeatherData = await getWeather(urlCoordinates);
            setCurrentWeatherData(currentWeatherData);
            // const urlForecast = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=6&appid=${key}`)
            // const weekWeatherData = await getWeather(urlForecast);
            // setWeekWeatherData(weekWeatherData);
        });
    }
});

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const locationName = document.querySelector("#location-name").value;
    if (!locationName) {
        return;
    }
    const urlLocationName = `http://api.openweathermap.org/data/2.5/weather?q=${locationName}&appid=${key}`;
    const currentWeatherData = await getWeather(urlLocationName);
    setCurrentWeatherData(currentWeatherData);

});

const setCurrentWeatherData = (data) => {
    const weather = {};
    weather.temperature = {
        unit: "celsius"
    }
    weather.temperature.value = Math.floor(data.main.temp - KELVIN);
    weather.temperature.value = Math.floor(data.main.feels_like - KELVIN);
    weather.description = data.weather[0].description;
    weather.city = data.name;
    weather.country = data.sys.country;
    weather.iconId = data.weather[0].icon;
    displayWeather(weather);
}

const displayWeather = (weather) => {
    temperatureValue.innerHTML = ` ${weather.temperature.value}°<span>C</span>`;
    temperatureDescription.innerHTML = weather.description;
    locationn.innerHTML = ` ${weather.city}, ${weather.country}`;
    temperatureFeel.innerHTML = ` ${weather.temperature.value}°<span>C feels like</span>`;
    weatherIcon.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    
}

const getWeather = (urlWeather) => {
    return axios.get(urlWeather)
        .then(response => {
            const { data = {} } = response;
            return data;
        }).catch(error => {
            throw error;
        });
}