const loading = document.getElementById("loading");
const error = document.getElementById("error");



const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

let forecastData = null;

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if(city === ""){
        alert("Please enter a city name");
        return;
    }

    getCoordinates(city);
});



async function getCoordinates(city){

    try{

        loading.classList.remove("hidden");
        error.classList.add("hidden");

        const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
        );

        const data = await response.json();

        if(!data.results){
            throw new Error("City not found");
        }

        const latitude = data.results[0].latitude;
        const longitude = data.results[0].longitude;

        document.getElementById("cityName").textContent = city;

        getWeather(latitude, longitude);

    }
    catch(err){

        loading.classList.add("hidden");

        error.textContent = err.message;
        error.classList.remove("hidden");

    }

}




async function getWeather(latitude, longitude){

    try{

        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=5`
        );

        const data = await response.json();

        displayWeather(data.current);
        forecastData = data.daily;
        displayForecast(forecastData);

        loading.classList.add("hidden");

    }
    catch(err){

        loading.classList.add("hidden");

        error.textContent = "Unable to load weather data.";
        error.classList.remove("hidden");

    }

}




function displayWeather(weather){

    document.getElementById("temperature").textContent =
        `Temperature: ${weather.temperature_2m}°C`;

    document.getElementById("humidity").textContent =
        `Humidity: ${weather.relative_humidity_2m}%`;

    document.getElementById("wind").textContent =
        `Wind Speed: ${weather.wind_speed_10m} km/h`;

    document.getElementById("condition").textContent =
        `Condition: ${getWeatherDescription(weather.weather_code)}`;
    document.getElementById("weatherIcon").textContent =
    getWeatherIcon(weather.weather_code);

}




function getWeatherDescription(code){

    switch(code){

        case 0:
            return "Clear Sky";

        case 1:
        case 2:
        case 3:
            return "Partly Cloudy";

        case 45:
        case 48:
            return "Foggy";

        case 51:
        case 53:
        case 55:
            return "Drizzle";

        case 61:
        case 63:
        case 65:
            return "Rain";

        case 71:
        case 73:
        case 75:
            return "Snow";

        case 95:
            return "Thunderstorm";

        default:
            return "Unknown";
    }

}



function displayForecast(daily){

    const forecastContainer =
        document.querySelector(".forecast-cards");

    const selectedFilter =
        document.getElementById("weatherFilter").value;

    forecastContainer.innerHTML = "";

    for(let i = 0; i < daily.time.length; i++){

        const condition =
            getWeatherDescription(daily.weather_code[i]);

        if(
            selectedFilter !== "all" &&
            condition !== selectedFilter
        ){
            continue;
        }

        const card = document.createElement("div");

        card.classList.add("forecast-card");

        card.innerHTML = `
            <h3>${new Date(daily.time[i]).toLocaleDateString()}</h3>
            <p>${condition}</p>
            <p>Max: ${daily.temperature_2m_max[i]}°C</p>
            <p>Min: ${daily.temperature_2m_min[i]}°C</p>
        `;

        forecastContainer.appendChild(card);

    }
}


function getWeatherIcon(code){

    if(code === 0){
        return "☀️";
    }

    if(code >= 1 && code <= 3){
        return "⛅";
    }

    if(code >= 51 && code <= 65){
        return "🌧️";
    }

    if(code >= 71 && code <= 75){
        return "❄️";
    }

    if(code === 95){
        return "⛈️";
    }

    return "☁️";
}



cityInput.addEventListener("keypress", function(event){

    if(event.key === "Enter"){

        searchBtn.click();

    }

});


const weatherFilter =
    document.getElementById("weatherFilter");

weatherFilter.addEventListener("change", () => {

    if(forecastData){
        displayForecast(forecastData);
    }

});


function getCurrentLocation() {

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(

            (position) => {

                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                document.getElementById("cityName").textContent =
                    "Current Location";

                getWeather(latitude, longitude);

            },

            () => {
                getCoordinates("Addis Ababa");
            }

        );

    } else {

        getCoordinates("Addis Ababa");

    }

}

getCurrentLocation();