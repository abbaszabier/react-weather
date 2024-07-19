import React, { useState } from "react";
import NavTop from "./NavTop";
import CurrentWeather from "./CurrentWeater";
import WeatherForecast from "./WeatherForecast";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmptyState from "./EmptyState";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const WeatherFetcher = () => {
  const [location, setLocation] = useState("");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [selectedWeather, setSelectedWeather] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const fetchWeather = async (location) => {
    if (!location) {
      toast.error("Location cannot be empty!", {
        autoClose: 3000,
        position: "bottom-center",
      });
      return;
    }

    try {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=6`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setCurrentWeather(data);
      setForecastData(data.forecast.forecastday);
      setSelectedWeather(data.forecast.forecastday[0]);

      toast.success("Location found!", {
        autoClose: 3000,
        position: "bottom-center",
      });
      setLocation("");
    } catch (error) {
      toast.error("Failed to fetch weather data", {
        autoClose: 3000,
        position: "bottom-center",
      });
    }
  };

  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    try {
      // get apiKey from .env
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      const response = await fetch(
        `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${query}`
      );
      const data = await response.json();

      const filterData = Array.from(new Set(data.map((item) => item.name))).map(
        (name) => {
          return data.find((item) => item.name === name);
        }
      );

      setSuggestions(filterData);
    } catch (error) {
      console.error("Failed to fetch suggestions:", error);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setLocation(value);
    fetchSuggestions(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather(location);
  };

  const handleSuggestionClick = (suggestion) => {
    setLocation(suggestion);
    setSuggestions([]);
    fetchWeather(suggestion);
  };

  return (
    <div>
      <ToastContainer />
      <NavTop
        location={location}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        suggestions={suggestions}
        handleSuggestionClick={handleSuggestionClick}
        weatherData={currentWeather?.location}
      />
      {forecastData ? (
        <Wrapper>
          <CurrentWeather
            weatherData={currentWeather}
            selectedWeather={selectedWeather}
          />
          <WeatherForecast
            forecastData={forecastData}
            setSelectedWeather={setSelectedWeather}
            selectedWeather={selectedWeather}
          />
        </Wrapper>
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default WeatherFetcher;
