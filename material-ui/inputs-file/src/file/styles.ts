import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles<Theme>(
  theme => ({
    root: {
      margin: theme.spacing(1),
    },
    placeholder: {
      width: 200,
      height: 150,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    icon: {
      width: "100% !important",
      height: "100% !important",
      border: "#D7D7D7 3px dashed",
      color: "#D7D7D7",
    },
  }),
  { name: "InputFile" },
);
