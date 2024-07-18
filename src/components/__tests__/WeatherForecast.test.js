import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import WeatherForecast from "../WeatherForecast";

const mockForecastData = [
  {
    date: "2024-07-19",
    day: {
      condition: {
        icon: "https://cdn.weatherapi.com/weather/64x64/day/113.png",
        text: "Sunny",
      },
      avgtemp_c: 30,
    },
  },
  {
    date: "2024-07-20",
    day: {
      condition: {
        icon: "https://cdn.weatherapi.com/weather/64x64/day/113.png",
        text: "Cloudy",
      },
      avgtemp_c: 28,
    },
  },
  {
    date: "2024-07-21",
    day: {
      condition: {
        icon: "https://cdn.weatherapi.com/weather/64x64/day/113.png",
        text: "Rainy",
      },
      avgtemp_c: 25,
    },
  },
];

test("renders forecast data correctly", () => {
  render(
    <WeatherForecast
      forecastData={mockForecastData}
      setSelectedWeather={jest.fn()}
      selectedWeather={null}
    />
  );

  // Check each day's date
  mockForecastData.forEach((day) => {
    expect(screen.getByText(day.date)).toBeInTheDocument();
  });

  // Check each day's temperature
  mockForecastData.forEach((day) => {
    expect(screen.getByText(`Temperature ${day.day.avgtemp_c}°C`)).toBeInTheDocument();
  });

  // Check condition icons
  mockForecastData.forEach((day) => {
    expect(screen.getByAltText(day.day.condition.text)).toHaveAttribute('src', day.day.condition.icon);
  });
});