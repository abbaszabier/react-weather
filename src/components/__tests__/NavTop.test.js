import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavTop from '../NavTop';

describe('NavTop', () => {
  const defaultProps = {
    location: '',
    handleChange: jest.fn(),
    handleSubmit: jest.fn(),
    weatherData: null,
    suggestions: [],
    handleSuggestionClick: jest.fn(),
  };

  test('renders NavTop component', () => {
    render(<NavTop {...defaultProps} />);
    expect(screen.getByText('React Weather')).toBeInTheDocument();
  });

  test('shows weather data when provided', () => {
    const props = {
      ...defaultProps,
      weatherData: { name: 'New York' },
    };
    render(<NavTop {...props} />);
    expect(screen.getByText('New York')).toBeInTheDocument();
  });
});
