import React, { useState, useEffect } from "react";
import { fetchWeatherByCity, fetchWeatherByCoords } from "./WeatherService";
import SearchForm from "./components/SearchForm";
import WeatherCard from "./components/WeatherCard";
import HistoryList from "./components/HistoryList";
import lightBg from "./assets/light-bg.png";
import "./App.css";

export default function App() {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [weatherData, setWeatherData] = useState("");
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFetchWeather = async (e, cityParam, countryParam) => {
    if (e) e.preventDefault();

    const currentCity = cityParam || city?.trim();
    const currentCountry = countryParam || country?.trim();
    console.log("handleFetchWeather pressed");
    if (!currentCity || !currentCountry) {
      setError("Please enter both city and country.");
      setWeatherData(null);
      return;
    }

    setLoading(true);
    try {
      const data = await fetchWeatherByCity(currentCity, currentCountry);
      setWeatherData(data);
      setError(null);

      // Add to history
      const timestamp = new Date().toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      const newHistoryItem = {
        city: currentCity,
        country: currentCountry,
        timestamp,
      };
      setHistory((prevHistory) => [newHistoryItem, ...prevHistory]);
    } catch (err) {
      setWeatherData(null);
      setError(
        "Unable to fetch weather data. Please check the city and country."
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const data = await fetchWeatherByCoords(latitude, longitude);
          setWeatherData(data);
          setCity(data.name);
          setCountry(data.sys.country);
          setError(null);
        } catch (err) {
          setError("Unable to fetch weather data from your location.");
          setWeatherData(null);
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Unable to retrieve your location.");
        setWeatherData(null);
        setLoading(false);
      }
    );
  };

  const handleClear = () => {
    console.log("Handle clear pressed");
    setCity("");
    setCountry("");
  };

  const handleSearchHistory = (item) => {
    setCity(item.city);
    setCountry(item.country);
    handleFetchWeather(null, item.city, item.country);
  };

  const handleDeleteHistory = (index) => {
    setHistory((prevHistory) => prevHistory.filter((_, i) => i !== index));
  };

  useEffect(() => {
    fetchWeatherByLocation();
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${lightBg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        height: "100vh",
        width: "100vw",
        color: "rgba(255, 255, 255, 0.87)",
      }}
      className="app-container"
    >
      {/* Weather Search Form */}
      <SearchForm
        city={city}
        setCity={setCity}
        country={country}
        setCountry={setCountry}
        handleFetchWeather={handleFetchWeather}
        handleClear={handleClear}
      />

      {/* Loading, Error, or Weather Data */}
      {loading && <p className="loading-message">Loading...</p>}
      {error && <p className="error-message">Error: {error}</p>}
      {weatherData ? (
        <div className="weather-card">
          <WeatherCard
            weatherData={weatherData}
            country={country}
            timestamp={history[0]?.timestamp}
          />
          <HistoryList
            history={history}
            handleSearchHistory={handleSearchHistory}
            handleDeleteHistory={handleDeleteHistory}
          />
        </div>
      ) : (
        !loading && (
          <div className="placeholder">
            <p>
              Unable to fetch your location. Please enter a city and country
              manually to view the weather.
            </p>
          </div>
        )
      )}
    </div>
  );
}
