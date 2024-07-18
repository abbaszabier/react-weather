import React from "react";
import styled from "styled-components";

const WeatherWrapper = styled.div`
  padding: 20px;
  border-radius: 8px;
  grid-column: span 2;
  display: grid;
  gap: 10px;

  @media (max-width: 768px) {
    grid-column: span 1;
  }
`;

const LocationConditionWrapper = styled.div`
  grid-column: span 2;
  align-items: center;
  justify-content: center;
  display: grid;
  padding: 10px;
  place-items: center;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`;

const WeatherInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const InfoLabel = styled.span`
  font-weight: bold;
  margin-bottom: 5px;
`;

const InfoValue = styled.span`
  font-size: 1.2em;
`;

const CurrentWeather = ({ weatherData, selectedWeather }) => {
  if (!weatherData) return <p>No weather data available</p>;

  const { location } = weatherData;
  const { day } = selectedWeather;

  return (
    <WeatherWrapper>
      <LocationConditionWrapper>
        <h1>
          {location.name}, {selectedWeather.date}
        </h1>
        <img src={day.condition.icon} alt={day.condition.text} />
        <h3>{day.condition.text}</h3>
      </LocationConditionWrapper>
      <WeatherInfo>
        <InfoLabel>Temperature</InfoLabel>
        <InfoValue>{day.avgtemp_c}°C</InfoValue>
      </WeatherInfo>
      <WeatherInfo>
        <InfoLabel>Humidity</InfoLabel>
        <InfoValue>{day.avghumidity}%</InfoValue>
      </WeatherInfo>
      <WeatherInfo>
        <InfoLabel>Wind Speed</InfoLabel>
        <InfoValue>{day.maxwind_kph} kph</InfoValue>
      </WeatherInfo>
      <WeatherInfo>
        <InfoLabel>UV Index</InfoLabel>
        <InfoValue>{day.uv}</InfoValue>
      </WeatherInfo>
    </WeatherWrapper>
  );
};

export default CurrentWeather;
