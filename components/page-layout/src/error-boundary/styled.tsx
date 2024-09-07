import { Alert, Box, styled } from "@mui/material";

/* javascript-obfuscator:disable */
const nodeEnv = process.env.NODE_ENV;
/* javascript-obfuscator:enable */

export const StyledError = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  overflowY: "auto",
  minHeight: `calc(100vh - ${theme.spacing(16)})`,
  width: "100%",
  marginTop: nodeEnv !== "production" ? theme.spacing(4) : 0,
})) as typeof Box;

export const StyledAlert = styled(Alert)({
  width: "100%",
  "& .MuiAlert-action": {
    paddingTop: 0,
  },
}) as typeof Alert;

export const StyledPreWrapper = styled(Box)({
  width: "100%",
}) as typeof Box;

export const StyledPreTop = styled(Box)({
  marginBottom: 0,
  textWrap: "balance",
}) as typeof Box;

export const StyledPreBottom = styled(Box)({
  marginTop: 0,
  textWrap: "balance",
}) as typeof Box;
