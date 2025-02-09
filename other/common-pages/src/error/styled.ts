import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledContainer = styled(Box)({
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
});
