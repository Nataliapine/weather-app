const getLocationName = document.querySelector("#location-name")
const searchLocation = document.querySelector("#search-location");
const notificationError = document.querySelector(".notification");
const locationn = document.querySelector(".location p");
const temperatureValue = document.querySelector(".temperature-value p");
const temperatureDescription = document.querySelector(".temperature-description p");

const apiKey = "PFEkR3IMa4fUtA614FfkotMR8QDz1Hab";

const getCity = async(city) => {
    const url = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${apiKey}&q=${city}`
}

const getWeather = async(id) => {
    const url = 'http://dataservice.accuweather.com/currentconditions/v1/{locationKey}';
    const query = `${id}?apikey=${apiKey}`;
}

// const getWeather = async() => {
//     const mockWeather = await axios.get('https://weatherapi.free.beeceptor.com')
//         .then(response => response.data)
//         .catch(err => console.error(err));

//     console.log(mockWeather);
// }

// searchCity.addEventListener('click', function() {
//     getWeather(searchCity.value)
// })
// getWeather();