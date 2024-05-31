function searchCountry() {
    const countryInput = document.getElementById('countryInput').value;

    // Fetch country data from REST Countries API
    fetch(`https://restcountries.com/v2/name/${countryInput}`)
    .then(response => response.json())
    .then(data => {
        const country = data[0];
        const countryInfo = document.getElementById('countryInfo');
        countryInfo.innerHTML = `
            <h2>${country.name}</h2>
            <p>Capital: ${country.capital}</p>
            <p>Population: ${country.population}</p>
            <p>Region: ${country.region}</p>
            <img src="${country.flags[0]}" alt="Flag" width="100">
        `;
        
        // Fetch weather data from OpenWeatherMap API
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=YOUR_API_KEY&units=metric`)
        .then(response => response.json())
        .then(weatherData => {
            const weatherInfo = document.getElementById('weatherInfo');
            weatherInfo.innerHTML = `
                <h2>Weather in ${country.capital}</h2>
                <p>Temperature: ${weatherData.main.temp}°C</p>
                <p>Weather: ${weatherData.weather[0].description}</p>
            `;
        })
        .catch(error => {
            console.log('Error fetching weather data:', error);
            weatherInfo.innerHTML = '<p>Weather data not available</p>';
        });
    })
    .catch(error => {
        console.log('Error fetching country data:', error);
        countryInfo.innerHTML = '<p>Country not found</p>';
    });
}
