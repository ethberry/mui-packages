import { FC } from "react";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router";
import { Alert } from "@mui/material";

import { StyledContainer } from "./styled";

export const Message: FC = () => {
  const { message } = useParams<{ message: string }>();

  return (
    <StyledContainer>
      <Alert severity="warning" sx={{ width: "fit-content" }}>
        <FormattedMessage id={`messages.${message as string}`} />
      </Alert>
    </StyledContainer>
  );
};
