import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";

export default makeStyles<Theme>(
  theme => ({
    root: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }),
  { name: "ReCaptcha" },
);
