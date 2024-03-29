import React, { useState } from "react";
import "./mainPage.css";

const MainPage = () => {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const apiKey = "bd3efbb789cb9194a1d41e72ec47f4c5";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

  const fetchWeather = async () => {
    if (location.trim() === "") {
      setError("Please enter a location");
      return;
    }

    try {
      const response = await fetch(
        `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();
      if (data.cod !== 200) {
        setError(data.message);
      } else {
        setWeatherData(data);
      }
    } catch (error) {
      setError("An error occurred while fetching weather data");
    }
  };
  return (
    <>
      <div className="container">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location "
        />
        <button onClick={fetchWeather}>Get Weather</button>
        {error && <p className="error">{error}</p>}
        {weatherData && (
          <div className="weather-info">
            <h2>
              {weatherData.name}, {weatherData.sys.country}
            </h2>
            <p>Temperature: {weatherData.main.temp}°C</p>
            <p>Description: {weatherData.weather[0].description}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default MainPage;
