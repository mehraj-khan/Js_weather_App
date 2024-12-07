// const apikey = "507051d43d898f9e4ee6ce7cd20f3802";
// const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// async function check(city) {
//     const response = await fetch(apiurl + city + `&appid=${apikey}`);
//     var data = await response.json();
//     console.log(data);
//     document.querySelector(".city").innerHTML = data.name;
//     document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
//     document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
//     document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

// }


// (async function() {
//     await check("karachi");
// })();

const apikey = "507051d43d898f9e4ee6ce7cd20f3802"; 
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const WeatherIcon = document.querySelector(".weather .weather-icon");

async function check(city) {
    try {
        const response = await fetch(`${apiurl}&q=${city}&appid=${apikey}`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        if(response.status == 404){
            document.querySelector(".error").style.display = "block";
        }else{
            
            const data = await response.json();
            console.log(data);
            
            
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    
            const weatherCondition = data.weather[0].main;
            console.log("Weather Condition:", weatherCondition);
    
            if (weatherCondition === "Clouds") {
                WeatherIcon.src = "images/clouds.png";
            } else if (weatherCondition === "Clear") {
                WeatherIcon.src = "images/clear.png";
            } else if (weatherCondition === "Rain") {
                WeatherIcon.src = "images/rain.png";
            } else if (weatherCondition === "Haze") {
                WeatherIcon.src = "images/drizzle.png";
            } else if (weatherCondition === "Mist") {
                WeatherIcon.src = "images/mist.png";
            } else {
                WeatherIcon.src = "images/default.png"; // Fallback
            }
            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
    
            console.log("Image URL set to:", WeatherIcon.src);

        }
       
    } catch (error) {
        console.error("Failed to fetch weather data:", error);
    }
}

searchBtn.addEventListener("click", () => {
    check(searchBox.value);
});
