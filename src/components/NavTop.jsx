import React from "react";
import styled from "styled-components";
import { Location } from "iconsax-react";

const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: black;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    margin: 20px;
  }
`;

const Title = styled.h1`
  margin: 0;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  position: relative;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #c1c1c1;
  border-radius: 8px;
  position: relative;
  z-index: 1;
  &:focus {
    border-color: #0899ce;
    outline: none;
  }
`;

const Search = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: center;
  place-items: center;

  @media (max-width: 768px) {
    flex-direction: row;
    gap: 10px;
    margin-top: 10px;
  }
`;

const LocationGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const SuggestionsList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  background: white;
  color: black;
  position: absolute;
  top: 53px;
  left: 0;
  right: 0;
  z-index: 0;
  border-radius: 0 0 4px 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    top: 63px;
  }
`;

const SuggestionItem = styled.li`
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #0899ce;
    color: white;
  }
`;

const NavTop = ({
  location,
  handleChange,
  handleSubmit,
  weatherData,
  suggestions,
  handleSuggestionClick,
}) => (
  <NavWrapper>
    <Title>React Weather</Title>
    <Form onSubmit={handleSubmit}>
      <div>
        <Search>
          {weatherData && (
            <LocationGroup>
              <Location size="24" color="#969696" />
              <p>{weatherData?.name}</p>
            </LocationGroup>
          )}
          <Input
            type="text"
            value={location}
            onChange={handleChange}
            placeholder="Enter Location"
          />
          {suggestions?.length > 0 && (
            <SuggestionsList>
              {suggestions?.map((suggestion) => (
                <SuggestionItem
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion?.name)}
                >
                  {suggestion.name}
                </SuggestionItem>
              ))}
            </SuggestionsList>
          )}
        </Search>
      </div>
    </Form>
  </NavWrapper>
);

export default NavTop;
