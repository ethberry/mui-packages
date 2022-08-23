import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles<Theme>(
  () => ({
    wrapper: {
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
    },
    text: {
      width: "fit-content",
    },
  }),
  { name: "NotFound" },
);
