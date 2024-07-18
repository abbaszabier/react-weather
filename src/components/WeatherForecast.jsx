import React, { useState } from "react";
import styled from "styled-components";

const ForecastWrapper = styled.div`
  padding: 20px;
  border-radius: 8px;
  grid-column: span 2;

  @media (max-width: 768px) {
    grid-column: span 1;
  }
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;

  @media (max-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
  }
`;

const DayWrapper = styled.div`
  background: ${(props) =>
    props["data-selected"]
      ? "#29bbf0"
      : props["data-current"]
      ? "#29bbf0"
      : "#fff"};
  color: ${(props) =>
    props["data-selected"] ? "#fff" : props["data-current"] ? "#fff" : "#000"};
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: background 0.3s, color 0.3s;

  img {
    width: 75px; /* Sesuaikan ukuran gambar di sini */
    height: 75px; /* Sesuaikan ukuran gambar di sini */
  }
`;

const WeatherForecast = ({
  forecastData,
  setSelectedWeather,
  selectedWeather,
}) => {
  const [selectedDay, setSelectedDay] = useState(null);

  const handleClick = (day) => {
    setSelectedDay(day.date);
    setSelectedWeather(day);
  };

  return (
    <ForecastWrapper>
      <GridWrapper>
        {forecastData.map((day, index) => (
          <DayWrapper
            key={index}
            data-selected={selectedDay === day.date}
            data-current={selectedWeather?.date === day.date}
            onClick={() => handleClick(day)}
          >
            <h3>{day.date}</h3>
            <img src={day.day.condition.icon} alt={day.day.condition.text} />
            <p>Temperature {day.day.avgtemp_c}°C</p>
          </DayWrapper>
        ))}
      </GridWrapper>
    </ForecastWrapper>
  );
};

export default WeatherForecast;
