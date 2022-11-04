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
    image: {
      height: 170,
      width: 170,
      borderColor: "#fff",
      borderStyle: "solid",
      borderWidth: 0,
      overflow: "hidden",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      marginTop: theme.spacing(2),
    },
  }),
  { name: "ImageInput" },
);
