import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=d88b0e8d087d4cab8b941750232909&q=${city}`
      );
      setWeatherData(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert('Failed to fetch weather data. Please try again.');
    }
  };

  return (
    <div className="App">
      <input
      className='input'
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={handleChange}
      />
      <button className="button-search" onClick={handleSubmit}>Search</button>
      {loading && <p>Loading data...</p>}
      {weatherData && (
        <div className="weather-cards-container">
       
        <div className="weather-card">
          <p>Temperature: {weatherData.current.temp_c}°C</p>
        </div>
        <div className="weather-card">
          <p>Humidity: {weatherData.current.humidity}%</p>
        </div>
        <div className="weather-card">
          <p>Condition: {weatherData.current.condition.text}</p>
        </div>
        <div className="weather-card">
          <p>Wind Speed: {weatherData.current.wind_kph} km/h</p>
        </div>
      </div>
      )}
    </div>
  );
}

export default App;

         