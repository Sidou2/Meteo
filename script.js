// *** Récupérer le formulaire
const form = document.querySelector("form")
const input = document.querySelector("input")
const meteoHtml = document.querySelector(".meteo")
// *** Ecouter l'evenement

const API_KEY = "444b9df0aafcb18e4f2147bc83c86d2a"

form.addEventListener("submit", function (e) {
  e.preventDefault()
  getData(input.value)
  form.reset()
})


// *** Programme qui recupère les données méteo

async function getData(city) {
    // Fetch permet de faire un appel http
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=444b9df0aafcb18e4f2147bc83c86d2a&units=metric&lang=fr`)
    const weather = await response.json()
    console.log(weather)
    displayWeather(weather)
}

// *** Programme qui affiche les données méteo

function displayWeather(weather) {
    meteoHtml.innerHTML = `
    <h1>Données Méteo pour ${weather.name}</h1>
    <h2>Temps ${weather.weather[0].description}</h2>
    <p>Temperature ${Math.round(weather.main.temp)}</p>
    <p>Temperature Ressenti ${Math.round(weather.main.feels_like)} °C </p>
    <p>Temperature humide ${Math.round(weather.main.humidity)} % </p>
    `
}

// *** Geolocalisation
navigator.geolocation.getCurrentPosition(success, error)

// *** En cas de succes (l'utilisateur accepte de donner sa position)
    async function success(pos) {
    const lat = pos.coords.latitude
    const lon = pos.coords.longitude
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=444b9df0aafcb18e4f2147bc83c86d2a&units=metric&lang=fr`
    const response = await fetch(url)
    const weather = await response.json()
    displayWeather(weather)
}

// *** En cas de non succes (l'utilisateur n'accepte pas de donner sa position)
function error () {
    meteoHtml.innerHTML = "<h1> Vous avez refusé de donner votre position. Entrer le nom d'une ville"
}