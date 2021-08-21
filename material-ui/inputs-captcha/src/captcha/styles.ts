import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles<Theme>(
  theme => ({
    root: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }),
  { name: "ReCaptcha" },
);
