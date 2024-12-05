// WeatherService.jsx
import axios from "axios";

const API_KEY = "b600f58726e2bec5c12ed69290b0dc67";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const fetchWeatherByCity = async (city, country) => {
  try {
    // Construct the URL with units=metric for Celsius
    const fullUrl = `${BASE_URL}?q=${encodeURIComponent(
      city
    )},${encodeURIComponent(country)}&appid=${API_KEY}&units=metric`;
    console.log("Fetching weather by city and country:", fullUrl);

    const response = await axios.get(fullUrl);
    return response.data;
  } catch (error) {
    handleWeatherApiError(error);
  }
};

export const fetchWeatherByCoords = async (latitude, longitude) => {
  try {
    // Construct the URL with units=metric for Celsius
    const fullUrl = `${BASE_URL}?lat=${encodeURIComponent(
      latitude
    )}&lon=${encodeURIComponent(longitude)}&appid=${API_KEY}&units=metric`;
    console.log("Fetching weather by coordinates:", fullUrl);

    const response = await axios.get(fullUrl);
    return response.data;
  } catch (error) {
    handleWeatherApiError(error);
  }
};

// Helper function to handle errors
const handleWeatherApiError = (error) => {
  if (error.response && error.response.data && error.response.data.message) {
    throw new Error(error.response.data.message);
  } else {
    throw new Error("An error occurred while fetching the weather data.");
  }
};
