function getWeather() {
  const city = document.getElementById('city').value.trim();
  const container = document.getElementById('weather-container');

  if (!city) {
    alert('Please enter a city name');
    return;
  }

  const apiKey = '2cf55bccac33952e55dbb07f3c6759de';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error('City not found');
      return response.json();
    })
    .then(data => showWeather(data))
    .catch(err => {
      alert('Error: ' + err.message);
      container.style.display = 'none';
    });
}

function showWeather(data) {
  document.getElementById('city-name').textContent = `${data.name}, ${data.sys.country}`;
  document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
  document.getElementById('description').textContent = data.weather[0].description;

  const icon = document.getElementById('weather-icon');
  const weather = data.weather[0].main.toLowerCase();
  icon.textContent = getWeatherEmoji(weather);

  document.getElementById('weather-container').style.display = 'block';
}

function getWeatherEmoji(weather) {
  if (weather.includes('rain')) return '🌧️';
  if (weather.includes('cloud')) return '☁️';
  if (weather.includes('sun') || weather.includes('clear')) return '☀️';
  if (weather.includes('snow')) return '❄️';
  if (weather.includes('storm')) return '🌩️';
  return '🌈';
}
