// component empty state react
import styled from "styled-components";
import { SearchNormal1 } from "iconsax-react";

const EmptyWrapper = styled.div`
  justify-content: center;
  align-items: center;
  padding: 40px;
  height: fit-content;
  color: #c2c2c2;
`;

const EmptyState = () => {
  return (
    <EmptyWrapper>
      <SearchNormal1 size="48" color="#c2c2c2" />
      <p>
        No Data <br />
        Please search for a location to get the weather data.
      </p>
    </EmptyWrapper>
  );
};

export default EmptyState;
