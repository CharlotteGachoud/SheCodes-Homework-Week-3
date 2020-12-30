import React, { useState } from "react";
import axios from "axios";
import Loader from 'react-loader-spinner'

import "./Weather.css";

function SearchEngine() {
  const [city, setCity] = useState(null);
  const [message, setMessage] = useState(null);

  function displayWeather(response) {
    let temperature = Math.round(response.data.main.temp);
    let description = response.data.weather[0].description;
    let humidity = response.data.main.humidity;
    let wind = Math.round(response.data.wind.speed);
    let icon = response.data.weather[0].icon;
    let iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

    if (temperature){
      setMessage(
        <div>
          <h2>{city}</h2>
          <ul>
            <li>Temperature: {temperature}°C</li>
            <li>Description: {description}</li>
            <li>Humidity: {humidity}%</li>
            <li>Wind: {wind} km/h</li>
            <li>
              <img src={iconUrl} alt={description} />
            </li>
          </ul>
        </div>
      );
    } else {
      <Loader
         type="Bars"
         color="rgb(236, 73, 24)"
         height={20}
         width={20}
      />
    };
  }

  function handleSubmit(event) {
    event.preventDefault();
    let unit = "metric";
    let apiKey = "027401657e14d2712c8487adaadbd48b";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
    axios.get(apiUrl).then(displayWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  return (
    <div className="SearchEngine">
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Enter a city"
          autoFocus={true}
          onChange={updateCity}
        />
        <input className="button" type="submit" value="Search" />
      </form>
      <p>{message}</p>
    </div>
  );
}

export default SearchEngine;