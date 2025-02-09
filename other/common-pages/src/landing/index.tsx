import { FC } from "react";

import { StyledContainer, StyledLogo } from "./styled";

export const Landing: FC = () => {
  return (
    <StyledContainer>
      <a href="https://gemunion.io">
        <StyledLogo component="img" src="/logo.png" alt="GEMUNION" />
      </a>
    </StyledContainer>
  );
};
