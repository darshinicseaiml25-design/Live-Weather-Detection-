const API_KEY = "cf90015b84874fe7acf35727261906";

const cityEl = document.getElementById("city");
const tempEl = document.getElementById("temp");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const conditionEl = document.getElementById("condition");
const iconEl = document.getElementById("icon");

document
.getElementById("searchBtn")
.addEventListener("click", searchCity);

document
.getElementById("locationBtn")
.addEventListener("click", getCurrentLocation);

document
.getElementById("cityInput")
.addEventListener("keydown", (e) => {

  if(e.key === "Enter"){
    searchCity();
  }

});

async function getWeather(query){

  try{

    const url =
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${query}&aqi=yes`;

    const response = await fetch(url);

    const data = await response.json();

    if(data.error){
      alert(data.error.message);
      return;
    }

    cityEl.textContent =
      `${data.location.name}, ${data.location.country}`;

    tempEl.textContent =
      `${Math.round(data.current.temp_c)}°C`;

    conditionEl.textContent =
      data.current.condition.text;

    humidityEl.textContent =
      `${data.current.humidity}%`;

    windEl.textContent =
      `${data.current.wind_kph} km/h`;

    iconEl.src =
      "https:" + data.current.condition.icon;

  }
  catch(error){

    console.error(error);

    alert(
      "Unable to fetch weather data."
    );
  }
}

function searchCity(){

  const city =
    document.getElementById("cityInput")
    .value
    .trim();

  if(city){
    getWeather(city);
  }
}

function getCurrentLocation(){

  if(!navigator.geolocation){

    alert(
      "Geolocation not supported."
    );

    return;
  }

  navigator.geolocation.getCurrentPosition(

    position => {

      const lat =
        position.coords.latitude;

      const lon =
        position.coords.longitude;

      getWeather(`${lat},${lon}`);
    },

    error => {

      alert(
        "Location permission denied."
      );

      console.error(error);

    }

  );
}

window.addEventListener("load", () => {

  getCurrentLocation();

});
