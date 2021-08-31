import React, { useState, useEffect } from "react";
import "./style.css";
import WeatherCard from "./weathercard";

const Temperature = () => {
  const [searchValue, setSearchvalue] = useState("Delhi");
  const [tempinfo, setTempinfo] = useState({});

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=e3f83923b7a91f0fd15253bf5512a972`;

      const res = await fetch(url);
      const data = await res.json();

      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const fetchWeather = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };
      setTempinfo(fetchWeather);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  });

  return (
    <React.Fragment>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search...."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(event) => {
              setSearchvalue(event.target.value);
            }}
          />
          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
          >
            Search
          </button>
        </div>
      </div>
      <WeatherCard tempinfo={tempinfo} />
    </React.Fragment>
  );
};

export default Temperature;
