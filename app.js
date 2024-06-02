const apiKey = '65f6e1f6b116087d4f448568df06c212';  // Replace with your OpenWeather API key

document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.getElementById('cityInput').value;
    if (city) {
        getWeatherForecast(city);
    }
});

function getWeatherForecast(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeatherForecast(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again.');
        });
}

function displayWeatherForecast(data) {
    const weatherContainer = document.getElementById('weatherContainer');
    weatherContainer.innerHTML = '';  // Clear previous results

    const cityName = data.city.name;
    const forecasts = data.list.filter((forecast, index) => index % 8 === 0).slice(0, 3);  // Get forecasts for next 3 days

    forecasts.forEach(forecast => {
        const date = new Date(forecast.dt_txt);
        const temp = forecast.main.temp;
        const description = forecast.weather[0].description;
        const icon = forecast.weather[0].icon;

        const cardHtml = `
            <div class="col-md-4">
                <div class="card mb-4">
                    <div class="card-body">
                        <h5 class="card-title">${cityName}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${date.toDateString()}</h6>
                        <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${description}">
                        <p class="card-text">Temperature: ${temp}°C</p>
                        <p class="card-text">${description}</p>
                    </div>
                </div>
            </div>
        `;

        weatherContainer.insertAdjacentHTML('beforeend', cardHtml);
    });
}
