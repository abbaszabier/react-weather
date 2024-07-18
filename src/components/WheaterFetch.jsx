// src/components/WeatherFetcher.js
import { useState } from "react";
import NavTop from "./NavTop";
import CurrentWeather from "./CurrentWheater";
import WeatherForecast from "./WeatherForecast";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmptyState from "./EmptyState";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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

  const fetchWeather = async () => {
    if (!location) {
      toast.error("Location cannot be empty!", {
        autoClose: 3000,
        position: "bottom-center",
      });
      return;
    }

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=702091cb92334df18c5115112241707&q=${location}&days=6`
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

  const handleChange = (e) => setLocation(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div>
      <ToastContainer />
      <NavTop
        location={location}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        weatherData={currentWeather?.location}
      />
      {currentWeather && forecastData ? (
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
