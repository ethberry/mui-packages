import { FC } from "react";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router";

import { Alert, Box } from "@mui/material";

export const Message: FC = () => {
  const { message } = useParams<{ message: string }>();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        height: "calc(100vh - 64px)",
        width: "100vw",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        marginTop: "64px",
      }}
    >
      <Alert severity="warning" sx={{ width: "fit-content" }}>
        <FormattedMessage id={`messages.${message as string}`} />
      </Alert>
    </Box>
  );
};
