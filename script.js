const apiKey = "06d5ada67fb375c93b8d4d94cc2e3252";
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather`;

const cityName = document.getElementById('city-name')
const date = document.getElementById('date')
const weatherIcon = document.getElementById('weather-icon')
const temperature = document.getElementById('temperature')
const decription = document.getElementById('description')
const windSpeed = document.getElementById('wind-speed')

document.addEventListener('DOMContentLoaded', getWeather('Delhi'))

document.getElementById('city-input-btn').addEventListener('click', e => {
    e.preventDefault();
    let cityInput = document.getElementById('city-input');

    getWeather(cityInput.value);

    cityInput.value = ""
    
})

async function getWeather(cityInput) {
    const temp = `${weatherUrl}?q=${cityInput}&appid=${apiKey}`
    try {
        const res = await fetch(temp);
        const data = await res.json();

        if (res.ok) {
            getWeatherDetails(data)
        } else {
            document.getElementById('wrong-input-city').innerText = 'City not found. Please try again'
        }
    } catch(error) {
        console.log(`Error fetching Weather Data: `, Error);
        
    }

}

function getWeatherDetails(data) {
    console.log(data);
    let temp = Math.round(Number(data.main.temp) - 273.15)
    let today = new Date() 
    let icon = data.weather[0].icon   

    cityName.textContent = data.name
    date.textContent = today.toDateString();

    weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`
    temperature.textContent = `${temp}°C`
    decription.textContent = data.weather[0].description
    windSpeed.textContent = `wind speed: ${data.wind.speed}`
    

}