import { FC } from "react";
import { useParams } from "react-router";
import { FormattedMessage } from "react-intl";
import { Alert } from "@mui/material";

import { StyledContainer } from "./styled";

export const Error: FC = () => {
  const { error } = useParams<{ error: string }>();

  return (
    <StyledContainer>
      <Alert severity="error" sx={{ width: "fit-content" }}>
        <FormattedMessage id={`errors.${error!}`} />
      </Alert>
    </StyledContainer>
  );
};
