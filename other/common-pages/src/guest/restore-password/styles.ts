import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles<Theme>(
  () => ({
    popup: {
      width: 400,
      margin: "auto",
    },
    section: {
      alignItems: "center",
      justifyContent: "center",
      maxWidth: 500,
      margin: "0 auto",
    },
    button: {
      marginRight: 0,
    },
  }),
  { name: "RestorePassword" },
);
