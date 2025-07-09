const apiKey = "4dfb35038a7b43b79bf173232250507";
const cityInput = document.getElementById("cityInput");
window.onload = function () {
  getWeather("Cairo");
};

function searchCity() {
  const city = cityInput.value.trim();
  if (city.length >= 3) {
    getWeather(city);
  }
  console.log(city.length);
}
cityInput.addEventListener("keyup", searchCity);
document.getElementById("Search").addEventListener("click", searchCity);
function getWeather(city = "") {
  if (!city) return;
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(
    city
  )}&days=3`;

  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then((data) => {
      displayWeather(data);
    })
    .catch((error) => {
      const errorMassage = document.getElementById("errorMassage");
      errorMassage.innerHTML = error;
      errorMassage.classList.add("Massage");
      setTimeout(() => {
        errorMassage.innerHTML = "";
        errorMassage.classList.remove("Massage");
      }, 2500);
    });
}

function displayWeather(data) {
  const resultsDiv = document.getElementById("weatherResults");
  resultsDiv.innerHTML = "";
  const location = data.location.name;
  const country = data.location.country;

  data.forecast.forecastday.forEach((day) => {
    const date = day.date;
    const avgTemp = day.day.avgtemp_c;
    const maxTemp = day.day.maxtemp_c;
    const minTemp = day.day.mintemp_c;
    const condition = day.day.condition.text;
    const icon = day.day.condition.icon;
    const windSpeed = day.day.maxwind_kph;
    const firstHour = day.hour[0]; // أول ساعة من اليوم
    const windDir = firstHour.wind_dir;

    const dayOfWeek = new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
    });

    resultsDiv.innerHTML += `
      <div class="weather-card">
        <h3>${dayOfWeek}, ${date}</h3>
        <p>Location: ${location}, ${country}</p>
        <p>Average Temp: ${avgTemp}°C</p>
        <p>Max Temp: ${maxTemp}°C</p>
        <p>Min Temp: ${minTemp}°C</p>
        <p>Condition: ${condition}</p>
        <img src="https:${icon}" alt="${condition}">
        <p>Wind: ${windSpeed} km/h </p>
        <p>Direction: ${windDir}</p>
      </div>
    `;
  });
}
// Toggle Dark / Light Mode
document.getElementById("toggleMode").addEventListener("click", () => {
  const body = document.body;
  if (body.classList.contains("light-mode")) {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
    document.getElementById(
      "toggleMode"
    ).innerHTML = `<img src="./photos/imgi_6_113.png" alt="sun icon">`;
  } else {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    document.getElementById(
      "toggleMode"
    ).innerHTML = `<img src="./photos/imgi_2_113.png" alt="moon icon">`;
  }
});
