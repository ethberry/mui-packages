import { FC } from "react";
import { companyName } from "@ethberry/constants";

import { StyledContainer, StyledLogo } from "./styled";

export const Landing: FC = () => {
  return (
    <StyledContainer>
      <a href={process.env.FE_URL}>
        <StyledLogo component="img" src="/logo.png" alt={companyName} />
      </a>
    </StyledContainer>
  );
};
