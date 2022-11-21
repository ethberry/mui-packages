import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles<Theme>(
  () => ({
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    logo: {
      display: "block",
      maxHeight: "calc(100vh - 94px)",
      maxWidth: "100vw",
      margin: "0 auto",
    },
  }),
  { name: "Landing" },
);
