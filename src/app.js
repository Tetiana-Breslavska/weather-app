//////////////////city forecast

function showCityForecast(response) {
    console.log(response.data);
    let city = response.data.name;
    celsiusTemp = Math.round(response.data.main.temp);
    let humidity = response.data.main.humidity;
    let wind = Math.round(response.data.wind.speed);
    let weatherDesc = response.data.weather[0].main;
    
    // let icon = 
    const weatherEmoji = {
        "clear": "☀️",
        "clouds": "☁️",
        "rain": "🌧️",
        "drizzle": "🌧️",
        "snow": "🌨️",
        "thunderstorm": "⛈️"

    }
    // console.log(weatherEmoji[weatherDesc]);
    // console.log(weatherDesc);
    let currentCityWrap = document.querySelector(".current-city");
    currentCityWrap.innerHTML = `${city}`;
    let currentTempWrap = document.querySelector(".current-temp");
    currentTempWrap.innerHTML = celsiusTemp;
    let currentHumidityWrap = document.querySelector(".current-humidity");
    currentHumidityWrap.innerHTML = `Humidity: ${humidity}%`;
    let currentWindWrap = document.querySelector(".current-wind");
    currentWindWrap.innerHTML = `Wind: ${wind} m/s`;
    let currentWeatherEmojiWrap = document.querySelector(".current-weather-emoji");
    currentWeatherEmojiWrap.innerHTML = `${weatherEmoji[(weatherDesc.toLowerCase())]}`;
    let currentWeatherDescWrap = document.querySelector(".current-weather-desc");
    currentWeatherDescWrap.innerHTML = `${weatherDesc}`;
}


////////////////current city

function handlePosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "93d43dfe3b4a950e5b187e5dc313705e";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&li`;
    axios.get(apiUrl).then(showCityForecast);
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
        let apiKey = "93d43dfe3b4a950e5b187e5dc313705e";
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCityValue}&appid=${apiKey}&units=metric`;
        axios.get(apiUrl)
            .then(showCityForecast)
            .catch((error) => {
                alert(`Sorry, we don't know the weather for ${inputCityValue}, try going to https://www.google.com/search?q=weather+${inputCityValue}`)
            })
    }
    else {
        alert("Enter a city, please!")
    }
});



////////list of cities in the header

function showCityFromList(event) {
    event.preventDefault();
    let cityClick = event.target;
    let apiKey = "93d43dfe3b4a950e5b187e5dc313705e";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityClick.id}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl)
        .then(showCityForecast)
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



