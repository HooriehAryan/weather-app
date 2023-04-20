// -----------------------dispaly date-------------------
let now = new Date();

function formatDate(currentDate) {
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jully",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  let month = months[now.getMonth()];

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];
  let date = now.getDate();

  let formattedDate = ` ${day}, ${date} ${month} `;
  return formattedDate;
}

let newDate = formatDate(now);
let minute = now.getMinutes();
if (minute.toString().length === 1) {
  minute = "0" + minute;
}
let hour = now.getHours();
if (hour.toString().length === 1) {
  hour = "0" + hour;
}
let NewDateTime = document.querySelector("#date-time");
NewDateTime.innerHTML = `${newDate} ${hour}:${minute}`;

// ---------------current location weather------------------
function displayCurrentWeather(response) {
  console.log(response);
  let temperatureC = Math.round(response.data.main.temp);
  let showTemp = document.querySelector("#current-temp");
  showTemp.innerHTML = `${temperatureC}`;

  // let description = response.data.weather[0].description;
  let description = response.data.weather[0].main;
  let showDes = document.querySelector("#description");
  showDes.innerHTML = `${description}`;

  let humidity = response.data.main.humidity;
  let showHumidity = document.querySelector("#humidity");
  showHumidity.innerHTML = `${humidity}`;

  let windSpeed = Math.round(response.data.wind.speed);
  let showWind = document.querySelector("#windSpeed");
  showWind.innerHTML = `${windSpeed}`;

  let feelsLike = Math.round(response.data.main.feels_like);
  let showFeels = document.querySelector("#feelsLike");
  showFeels.innerHTML = `${feelsLike}`;

  let tempMax = Math.round(response.data.main.temp_max);
  let showTempMax = document.querySelector("#maxTemp");
  showTempMax.innerHTML = `${tempMax}`;

  let tempMin = Math.round(response.data.main.temp_min);
  let showTempMin = document.querySelector("#minTemp");
  showTempMin.innerHTML = `${tempMin}`;

  let cityTitle = document.querySelector("#city-title");
  cityTitle.innerHTML = `${response.data.name}`;
}

function showPosition(position) {
  console.log(position);
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let key = "cff65853d7c461490797b173c0cc1233";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}&units=metric`;

  axios.get(url).then(displayCurrentWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#currentLocation");
button.addEventListener("click", getCurrentPosition);

// -----------------

function cityTitle(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input");
  let newCityTitle = document.querySelector("#city-title");
  if (city.value) {
    newCityTitle.innerHTML = `${city.value}`;
  } else {
    newCityTitle.innerHTML = "San Diego";
  }

  let key2 = "5f472b7acba333cd8a035ea85a0d4d4c";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${key2}&units=metric`;
  axios.get(url).then(displayCurrentWeather);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", cityTitle);
