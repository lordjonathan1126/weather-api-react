import React from "react";

export default function SearchForm({
  city,
  setCity,
  country,
  setCountry,
  handleFetchWeather,
  handleClear,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    handleFetchWeather(e);
  };

  const onClear = () => {
    console.log("Clear button clicked");
    handleClear();
  };

  return (
    <form className="weather-form" onSubmit={handleSubmit}>
      <div className="input-row">
        <input
          id="city"
          name="city"
          autoComplete="off"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          required
        />
        <input
          id="country"
          name="country"
          autoComplete="off"
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Enter country"
          required
        />
        <button type="button" onClick={onClear}>
          Clear
        </button>
        <button type="submit">Search</button>
      </div>
    </form>
  );
}
