// DOM elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherDiv = document.getElementById('weather');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');

const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');

// API key (in a real app, this would be secured differently)
const apiKey = '2cf55bccac33952e55dbb07f3c6759de3'; // This is a placeholder - replace with your own API key

// Function to fetch weather data
async function fetchWeather(city) {
    try {
        // Show loading spinner
        loadingDiv.style.display = 'block';
        weatherDiv.style.display = 'none';
        errorDiv.style.display = 'none';
        
        // Fetch data from OpenWeatherMap API
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        
        // Check if response is ok
        if (!response.ok) {
            throw new Error('City not found');
        }
        
        const data = await response.json();
        
        // Hide loading spinner
        loadingDiv.style.display = 'none';
        
        // Display weather data
        weatherDiv.style.display = 'block';
        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        description.textContent = data.weather[0].description;
        humidity.textContent = `${data.main.humidity}%`;
        windSpeed.textContent = `${data.wind.speed} km/h`;
        
    } catch (err) {
        // Hide loading spinner
        loadingDiv.style.display = 'none';
        
        // Show error message
        errorDiv.style.display = 'block';
        errorDiv.textContent = 'City not found. Please try again.';
        weatherDiv.style.display = 'none';
        
        console.error('Error fetching weather data:', err);
    }
}

// Event listener for search button
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        errorDiv.style.display = 'block';
        errorDiv.textContent = 'Please enter a city name';
    }
});

// Event listener for Enter key
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        } else {
            errorDiv.style.display = 'block';
            errorDiv.textContent = 'Please enter a city name';
        }
    }
});
