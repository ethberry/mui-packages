import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles<Theme>(
  theme => ({
    root: {
      height: 200,
      width: 200,
      position: "relative",
      marginTop: theme.spacing(2),
    },
    container: {
      marginTop: theme.spacing(1),
    },
    button: {
      position: "absolute",
      top: 0,
      right: 0,
    },
    video: {
      height: 150,
      width: 180,
      marginTop: theme.spacing(2),
    },
  }),
  { name: "VideoInput" },
);
