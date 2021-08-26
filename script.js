let locationName = document.querySelector("#location-name");
const form = document.querySelector(".input-group");
const searchLocation = document.querySelector("#search-location");
const notificationError = document.querySelector(".notification");
const locationn = document.querySelector(".location p");
const temperatureValue = document.querySelector(".temperature-value p");
const temperatureDescription = document.querySelector(".temperature-description p");
const temperatureWeek = document.querySelector(".days-of-the-week");
const msg = document.querySelector(".msg");

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

const getWeather = async(lat, lon) => {
    let api = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`)
        .then(response => {
            let data = response.data
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        });
        
}
    

const displayWeather = () => {
    temperatureValue.innerHTML = ` ${weather.temperature.value}°<span>C</span>`;
    temperatureDescription.innerHTML = weather.description;
    locationn.innerHTML = ` ${weather.city}, ${weather.country}`;
    // temperatureWeek.innerHTML = ``;
}


// const getWeather = async() => {
//     const mockWeather = await axios.get('https://weatherapi.free.beeceptor.com')
//         .then(response => response.data)
//         .catch(err => console.error(err));

//     console.log(mockWeather);
// }