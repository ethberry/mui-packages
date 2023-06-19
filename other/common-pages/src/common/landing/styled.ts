import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const StyledLogo = styled(Box)({
  display: "block",
  maxHeight: "calc(100vh - 94px)",
  maxWidth: "100vw",
  margin: "0 auto",
}) as typeof Box;
