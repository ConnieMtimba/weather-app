// function changeToFah(event) {
//   event.preventDefault();
//   let temperature = document.querySelector("#temp");
//   temperature.innerHTML = 73;
// }
// let fahrenheit = document.querySelector("#fahrenheit");
// fahrenheit.addEventListener("click", changeToFah);

// function changeToCelsius(event) {
//   event.preventDefault();
//   let temperature = document.querySelector("#temp");
//   temperature.innerHTML = 23;
// }
// let celsius = document.querySelector("#celsius");
// celsius.addEventListener("click", changeToCelsius);

let current = new Date();
let dateTime = document.querySelector("#dateTime");
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[current.getDay()];
let hours = current.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = current.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

dateTime.innerHTML = `${day} ${hours}:${minutes}`;

function showWeatherCondition(response) {
  let temperature = Math.round(response.data.main.temp);
  let temp = document.querySelector("#temp");
  temp.innerHTML = ` ${temperature}°C`;

  let description = document.querySelector("#weather-description");
  description.innerHTML = `${response.data.weather[0].description}`;

  let weatherCity = document.querySelector("#city");
  weatherCity.innerHTML = `${response.data.name}`;

  let humid = document.querySelector("#humidity");
  humid.innerHTML = `Humidity: ${response.data.main.humidity}%`;

  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `Wind: ${response.data.wind.speed}km/h`;
}

function searchCity(city) {
  let apiKey = "e996bbb3f409323f501c0b7bd98d7e7d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showWeatherCondition);
}

function cityInput(event) {
  event.preventDefault();
  let city = document.querySelector("#cityInput").value;
  searchCity(city);
}

function showLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "e996bbb3f409323f501c0b7bd98d7e7d";
  let apiurl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiurl).then(showWeatherCondition);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", currentLocation);
searchCity("Harare");

let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", cityInput);
