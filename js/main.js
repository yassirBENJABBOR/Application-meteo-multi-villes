const API_KEY = "e1c0af021b0174278b39a5ca47984293";

const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const weathercard = document.querySelector(".weather-card")
const errortext = document.querySelector("#error-text")
const loading = document.querySelector("#loading")

searchForm.addEventListener("submit",function(event){

    event.preventDefault()
    const ville = searchInput.value.trim()
    if (ville === ""){
        errortext.textContent ="veuiller entrer un ville"
        errortext.classList.remove("hidden")
        searchInput.classList.add("border-red-500")
        return;
    }  
    errortext.classList.add("hidden");
    loading.classList.remove("hidden");
    searchInput.classList.remove("border-red-500")
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${API_KEY}&units=metric`;

    fetch(url)
    .then(function(response){
        console.log(response.ok)
        return response.json()
    })
    .then(function(data){
        console.log(data)
    })
    .catch(function(error){
        console.error(error)
    })
    .finally(function(){
        loading.classList.add("hidden")
    })

})