//////////////////city current weather

function showCityCurrentWeather(response) {
    console.log(response.data);
    fDegree.classList.remove("active");
    cDegree.classList.add("active")
    let city = response.data.city;
    celsiusTemp = Math.round(response.data.temperature.current);
    let humidity = response.data.temperature.humidity;
    let wind = Math.round(response.data.wind.speed);
    let weatherDesc = response.data.condition.description;
    let weatherIconDescr = response.data.condition.icon;
    let weatherIconUrl = response.data.condition.icon_url;
    let currentCityWrap = document.querySelector(".current-city");
    currentCityWrap.innerHTML = `${city}`;
    let currentTempWrap = document.querySelector(".current-temp");
    currentTempWrap.innerHTML = celsiusTemp;
    let currentHumidityWrap = document.querySelector(".current-humidity");
    currentHumidityWrap.innerHTML = `Humidity: ${humidity}%`;
    let currentWindWrap = document.querySelector(".current-wind");
    currentWindWrap.innerHTML = `Wind: ${wind} m/s`;
    let currentWeatherIconWrap = document.querySelector("#icon");
    currentWeatherIconWrap.setAttribute("src", `${weatherIconUrl}`);
    currentWeatherIconWrap.setAttribute("alt", `${weatherIconDescr}`);
    let currentWeatherDescWrap = document.querySelector(".current-weather-desc");
    currentWeatherDescWrap.innerHTML = `${weatherDesc}`;
}


////////city forecast
function showCityForecast(response) {
    let buttons = document.querySelectorAll(".button");
    console.log(buttons);
    buttons.forEach((button) => {
        button.classList.add("btn", "btn-primary");
        button.innerHTML = `More details`;

    })

    console.log(response.data);
    for (let i = 1; i < 6; i++) {
        ///icon
        let weekWeatherIconUrl = response.data.daily[i].condition.icon_url;
        let weekWeatherIconDescr = response.data.daily[i].condition.description;
        let weekWeatherIconWrap = document.querySelector(`#card-${i} .card-icon`);
        weekWeatherIconWrap.setAttribute("src", `${weekWeatherIconUrl}`);
        weekWeatherIconWrap.setAttribute("alt", `${weekWeatherIconDescr}`);

        ///day
        let time = new Date(response.data.daily[i].time * 1000);
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let dayOfWeek = days[time.getDay()];
        let dayWrap = document.querySelector(`#card-${i} .card-title`);
        dayWrap.innerHTML = dayOfWeek;

        ///temperature
        let weekWeatherTemp = Math.round(response.data.daily[i].temperature.day);
        let weekWeatherTempWrap = document.querySelector(`#card-${i} .card-text`);
        weekWeatherTempWrap.innerHTML = `${weekWeatherTemp}&#8451;`;

    }
    let weekWeatherWrap = document.querySelector(".week-weather");
    weekWeatherWrap.addEventListener("click", (event) => {
        event.preventDefault();
        let dayClick = event.target;
        let dayNumber = (dayClick.id).charAt(7);
        dayClick.classList.remove('btn');
        dayClick.classList.remove('btn-primary');
        let humidity = response.data.daily[dayNumber].temperature.humidity;
        let wind = Math.round(response.data.daily[dayNumber].wind.speed);
        dayClick.innerHTML = `Humidity: ${humidity}%<br/>Wind: ${wind} m/s`;
    });

}


////////////////current city

function handlePosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "0571at3f6f353aad9b4552f8eoe873f5";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric&li`;
    axios.get(apiUrl).then(showCityCurrentWeather);
    let apiUrlNextDays = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric&li`;
    axios.get(apiUrlNextDays)
        .then(showCityForecast);
}
navigator.geolocation.getCurrentPosition(handlePosition);


////////////currentCityButton

let currentButton = document.querySelector(".button-current");
currentButton.addEventListener("click", function () {
    navigator.geolocation.getCurrentPosition(handlePosition);
})


///////////current Date

function showCurrentDate(now) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let currentDay = days[now.getDay()];
    let currentHours = (now.getHours() < 10) ? `0${now.getHours()}` : `${now.getHours()}`;
    let currentMinutes = (now.getMinutes() < 10) ? `0${now.getMinutes()}` : `${now.getMinutes()}`;
    let currentDataString = `${currentDay} ${currentHours}:${currentMinutes}`;
    return currentDataString;
}
let now = new Date();
let currentTime = document.querySelector(".current-time");
currentTime.innerHTML = showCurrentDate(now);


////////////search city

let form = document.querySelector("#search-form");
let celsiusTemp = null;
form.addEventListener("submit", function (event) {
    event.preventDefault();
    let inputCityWrap = document.querySelector(".search-input");
    let inputCityValue = (inputCityWrap.value).trim();
    let currentCityWrap = document.querySelector(".current-city");
    if (inputCityValue) {
        let apiKey = "0571at3f6f353aad9b4552f8eoe873f5";
        let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${inputCityValue}&key=${apiKey}&units=metric`;
        axios.get(apiUrl)
            .then(showCityCurrentWeather)
            .catch((error) => {
                alert(`Sorry, we don't know the weather for ${inputCityValue}, try going to https://www.google.com/search?q=weather+${inputCityValue}`)
            })
        let apiUrlNextDays = `https://api.shecodes.io/weather/v1/forecast?query=${inputCityValue}&key=${apiKey}&units=metric`;
        axios.get(apiUrlNextDays)
            .then(showCityForecast);
    }
    else {
        alert("Enter a city, please!")
    }
});



////////list of cities in the header

function showCityFromList(event) {
    event.preventDefault();
    let cityClick = event.target;
    let apiKey = "0571at3f6f353aad9b4552f8eoe873f5";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityClick.id}&key=${apiKey}&units=metric`;
    axios.get(apiUrl)
        .then(showCityCurrentWeather);

    let apiUrlNextDays = `https://api.shecodes.io/weather/v1/forecast?query=${cityClick.id}&key=${apiKey}&units=metric`;
    axios.get(apiUrlNextDays)
        .then(showCityForecast);
}
let citiesList = document.querySelector("#citiesList");
citiesList.addEventListener("click", showCityFromList);


///////convert units of temp

let fDegree = document.querySelector("#f-degree");
fDegree.addEventListener("click", function (event) {
    event.preventDefault();
    fDegree.classList.add("active");
    cDegree.classList.remove("active")
    let tempWrap = document.querySelector(".current-temp");
    tempWrap.innerHTML = Math.round((celsiusTemp * 9 / 5) + 32);
})

let cDegree = document.querySelector("#c-degree");
cDegree.addEventListener("click", function (event) {
    event.preventDefault();
    fDegree.classList.remove("active");
    cDegree.classList.add("active")
    let tempWrap = document.querySelector(".current-temp");
    tempWrap.innerHTML = celsiusTemp;
})