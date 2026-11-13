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
const errorprevision = document.querySelector("#error-prevision")


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
        if (response.status === 404) {
            throw new Error("Ville introuvable");
        }
        if(response.status === 401){
            throw new Error("Cle API invalide");
        }
        if (response.status === 429){
            throw new Error("Trop de quota, resseyer plus tard")
        }
        if (response.status === 500){
            throw new Error("Service meteo indisponible")
        }
         if (!response.ok) {
            throw new Error("Erreur du chargement de weather ");
        }
        return response.json()
    })
    .then(function(data){
        console.log(data)
        resseyerbtn.classList.add("hidden");
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
        if (error instanceof TypeError) {
            errortext.textContent = "Verifiez votre connexion Internet";
        } else {
            errortext.textContent = error.message;
        } 
        resseyerbtn.classList.remove("hidden");
       errortext.classList.remove("hidden");
        weathercard.classList.add("hidden")

    })
    .finally(function(){
        loading.classList.add("hidden")
    })

    const prevision =document.querySelector("#prevision-card")
    const Previsionurl = `https://api.openweathermap.org/data/2.5/forecast?q=${ville}&appid=${API_KEY}&units=metric&lang=fr`;

    fetch(Previsionurl)
    .then(function(response){
        if (response.status === 404) {
            throw new Error("Ville introuvable");
        }
        if(response.status === 401){
            throw new Error("Cle API invalide");
        }
        if (response.status === 429){
            throw new Error("Trop de quota, resseyer plus tard")
        }
        if (response.status === 500){
            throw new Error("Service meteo indisponible")
        }
        if(!response.ok){
            throw new Error("Erreur du chargement de prevision");
        }
        return response.json()
    })
    .then(function(data){
        console.log(data.list)
        const previsionsFiltres = data.list.filter(function(previs){
            return previs.dt_txt.includes("12:00:00")
            
        })
        errorprevision.classList.add("hidden")

        prevision.textContent = "";
        previsionsFiltres.forEach(function(previs) {

            prevision.classList.remove("hidden")

            const previscarte = document.createElement("article")
            previscarte.className =" flex-1 rounded-xl bg-[#151F32] p-5 text-center"
            const day = document.createElement("h1")
            previscarte.appendChild(day)

            const icone = document.createElement("span")
            icone.className ="my-3 block text-3xl"
            previscarte.appendChild(icone)

            const descriptionPrevi =document.createElement("p")
            descriptionPrevi.className ="text-gray-300"
            previscarte.appendChild(descriptionPrevi)

            const temp = document.createElement("p")
            temp.className ="my-3 text-2xl font-bold text-[#38BDF8]"
            previscarte.appendChild(temp)

            const tempmaxmin =document.createElement("div")
            tempmaxmin.className ="mt-5 flex justify-around gap-3 text-gray-300 text-sm"
            const maxtemp =document.createElement("p")
            const mintemp =document.createElement("p")
            tempmaxmin.appendChild(maxtemp)
            tempmaxmin.appendChild(mintemp)
            previscarte.appendChild(tempmaxmin)

            prevision.append(previscarte)

            const date = new Date(previs.dt_txt);
            day.textContent = date.toLocaleString("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
            });

            temp.textContent =`${previs.main.temp} °C`
            const previsId = previs.weather[0].id;
            const previsic = WEATHER_CODES[previsId]
            icone.textContent =`${previsic.icon}`

            descriptionPrevi.textContent =`${previs.weather[0].description}`
            mintemp.textContent=`temp min : ${previs.main.temp_min}°C`
            maxtemp.textContent=`temp max : ${previs.main.temp_max}°C`
            
        });
    })
    .catch(function(error){
        console.error(error)
        prevision.replaceChildren();
        prevision.classList.add("hidden")

        if (error instanceof TypeError) {
            errorprevision.textContent = "Verifiez votre connexion Internet";
        } else {
            errorprevision.textContent=error.message
        } 
        errorprevision.classList.remove("hidden")
    })
    .finally(function(){
        // prevision.classList.add("hidden")
    })


    

})


const resseyerbtn = document.createElement("button")
resseyerbtn.textContent="Ressayer"
resseyerbtn.className = "hidden rounded-lg bg-red-800 p-3 font-bold text-white transition hover:bg-sky-400"
searchForm.append(resseyerbtn)  

const ville = searchInput.value.trim()
    derniereVille = ville;

resseyerbtn.addEventListener("click", function() {
    searchInput.value = derniereVille;
    searchForm.requestSubmit();
    // resseyerbtn.classList.add("hidden");
});


