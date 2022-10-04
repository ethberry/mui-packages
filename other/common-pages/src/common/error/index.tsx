import { FC } from "react";
import { useParams } from "react-router";
import { FormattedMessage } from "react-intl";
import { Alert, Box } from "@mui/material";

export const Error: FC = () => {
  const { error } = useParams<{ error: string }>();

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
      <Alert severity="error" sx={{ width: "fit-content" }}>
        <FormattedMessage id={`errors.${error as string}`} />
      </Alert>
    </Box>
  );
};
