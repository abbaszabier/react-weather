import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import CurrentWeather from "../CurrentWeater";

const weatherData = {
    location: { name: 'Test City' },
    forecast: { forecastday: [{ date: '2024-07-20', day: { condition: { text: 'Sunny', icon: 'https://cdn.weatherapi.com/weather/64x64/day/113.png' }, avgtemp_c: 25, avghumidity: 50, maxwind_kph: 10, uv: 5 } }] }
  };
  
  test('renders CurrentWeather component', () => {
    render(<CurrentWeather weatherData={weatherData} selectedWeather={weatherData.forecast.forecastday[0]} />);
    expect(screen.getByText('Test City, 2024-07-20')).toBeInTheDocument();
    expect(screen.getByText('Sunny')).toBeInTheDocument();
  });

test("renders no data message when weatherData is not provided", () => {
  render(<CurrentWeather weatherData={null} selectedWeather={null} />);
  expect(screen.getByText(/No weather data available/i)).toBeInTheDocument();
});
