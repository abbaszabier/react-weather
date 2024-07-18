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

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #c1c1c1;
  border-radius: 8px;
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

const NavTop = ({ location, handleChange, handleSubmit, weatherData }) => (
  <NavWrapper>
    <Title>React Weather</Title>
    <form onSubmit={handleSubmit}>
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
        </Search>
      </div>
    </form>
  </NavWrapper>
);

export default NavTop;
