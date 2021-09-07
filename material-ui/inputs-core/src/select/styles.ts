import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles<Theme>(
  theme => ({
    root: {
      margin: theme.spacing(1),
    },
  }),
  { name: "PasswordInput" },
);
