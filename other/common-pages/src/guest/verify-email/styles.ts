import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles<Theme>(
  () => ({
    popup: {
      width: 400,
      margin: "auto",
    },
  }),
  { name: "VerifyEmail" },
);
