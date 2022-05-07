import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles<Theme>(
  () => ({
    root: {
      position: "relative",
      minHeight: 40,
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  }),
  { name: "ProgressOverlay" },
);
