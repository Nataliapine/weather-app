let locationName = '';
const form = document.querySelector(".input-group");
const searchLocation = document.querySelector("#search-location");
const notificationError = document.querySelector(".notification");
const locationn = document.querySelector(".location p");
const temperatureValue = document.querySelector(".temperature-value p");
const temperatureFeel = document.querySelector(".temperature-feel p");
const temperatureDescription = document.querySelector(".temperature-description p");
const temperatureWeek = document.querySelector(".days-of-the-week");
const msg = document.querySelector(".msg");
const day = document.querySelector(".day1");
const day1 = document.querySelector(".day2");
const day2 = document.querySelector(".day3");
const day3 = document.querySelector(".day4");
const day4 = document.querySelector(".day5");
const day5 = document.querySelector(".day6");
const maxTemp = document.querySelector(".max-temp");
const weatherIcon = document.querySelector(".weather-icon");

const weather = {};
const KELVIN = 273;
const key = "91fd180b353bb31f1feca2c3c3ddc00a";

weather.temperature = {
    unit : "celsius"
}


window.addEventListener("load", () => {
    if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        getWeather(lat, lon);
      });
    }
});

form.addEventListener("submit", e => {
    e.preventDefault();
    locationName = document.querySelector("#location-name").value;
    getWeatherByName();
    
})

const getWeatherByName = async() => {
    await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${locationName}&appid=${key}`)
    .then(response => {
        let data = response.data
        return data;
    })
    .then(function(data){
        weather.temperature.value = Math.floor(data.main.temp - KELVIN);
        weather.temperature.value = Math.floor(data.main.feels_like - KELVIN);
        weather.description = data.weather[0].description;
        weather.city = data.name;
        weather.country = data.sys.country;
        weather.iconId = data.weather[0].icon;
    })
    .then(function(){
        displayWeather();
    });       
}

const getWeather = async(lat, lon) => {
    // let api = 
    await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`)
    // let api = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=6&appid=${key}`)
        .then(response => {
            let data = response.data
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            // weather.temperature.value = Math.floor(data.list[0].main.temp - KELVIN);
            weather.temperature.value = Math.floor(data.main.feels_like - KELVIN);
            weather.description = data.weather[0].description;
            weather.city = data.name;
            weather.country = data.sys.country;
            weather.iconId = data.weather[0].icon;
        })
        .then(function(){
            displayWeather();
        });       
}
   
// if(weather.temperature.value === )

const displayWeather = () => {
    temperatureValue.innerHTML = ` ${weather.temperature.value}°<span>C</span>`;
    temperatureDescription.innerHTML = weather.description;
    locationn.innerHTML = ` ${weather.city}, ${weather.country}`;
    temperatureFeel.innerHTML = ` ${weather.temperature.value}°<span>C feels like</span>`;
    weatherIcon.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
}



// const getWeather = async() => {
//     const mockWeather = await axios.get('https://weatherapi.free.beeceptor.com')
//         .then(response => response.data)
//         .catch(err => console.error(err));

//     console.log(mockWeather);
// }