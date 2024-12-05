import React from "react";

export default function WeatherCard({ weatherData, country, timestamp }) {
  return (
    <>
      {/* Row for temperature and icon */}
      <div className="temperature-icon-row">
        <div className="temperature-section">
          <p>Today's Weather</p>
          <h1>{Math.round(weatherData.main.temp)}°</h1>
          <p>
            H: {Math.round(weatherData.main.temp_max)}° L:{" "}
            {Math.round(weatherData.main.temp_min)}°
          </p>
          <p className="location">
            {weatherData.name}, {country}
          </p>
        </div>
        <div className="icon-section">
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt={weatherData.weather[0].description}
          />
        </div>
      </div>

      {/* Row with location, humidity, and weather description */}
      <div className="info-row">
        <p className="timestamp">{timestamp}</p>
        <p className="humidity">Humidity: {weatherData.main.humidity}%</p>
        <p className="description">{weatherData.weather[0].main}</p>
      </div>
    </>
  );
}
