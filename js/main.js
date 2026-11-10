import {WEATHER_CODES} from "./data.js"

const API_KEY = "e1c0af021b0174278b39a5ca47984293";

const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const weathercard = document.querySelector("#weather-card")
const errortext = document.querySelector("#error-text")
const loading = document.querySelector("#loading")

const afficheville = document.querySelector("#affiche-ville")
const temperature = document.querySelector("#temperature")
const weatherDes = document.querySelector("#weatherDes")
const Humidite =document.querySelector("#Humidite")
const Vent =document.querySelector("#Vent")

searchForm.addEventListener("submit",function(event){

    event.preventDefault()
    const ville = searchInput.value.trim()
    if (ville === ""){
        errortext.textContent ="veuiller entrer un ville"
        errortext.classList.remove("hidden")
        searchInput.classList.add("border-red-500")
        return;
    }  
    weathercard.classList.remove("hidden")
    errortext.classList.add("hidden");
    loading.classList.remove("hidden");
    searchInput.classList.remove("border-red-500")
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${API_KEY}&units=metric&lang=fr`;

    fetch(url)
    .then(function(response){
        console.log(response.ok)
        if (!response.ok) {
            throw new Error("Ville introuvable");
        }
        return response.json()
    })
    .then(function(data){
        console.log(data)
        afficheville.textContent =`${data.name}, ${data.sys.country}`
        temperature.textContent = `${data.main.temp} °C`
        weatherDes.textContent =`${data.weather[0].description}`
        Humidite.textContent =`Humidité : ${data.main.humidity}%`
        Vent.textContent = `Vent: ${(data.wind.speed * 3.6).toFixed(1)}km/h`

        const weatherId = data.weather[0].id;
        const weather = WEATHER_CODES[weatherId];
        console.log(weather.label);
        console.log(weather.icon);
        const weathericon=document.querySelector("#weather-icon")
        weathericon.textContent = weather.icon;

    })
    .catch(function(error){
        console.error(error)
        errortext.textContent = error.message;
        errortext.classList.remove("hidden");
        weathercard.classList.add("hidden")

    })
    .finally(function(){
        loading.classList.add("hidden")
    })

})


