import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";

export default makeStyles<Theme>(
  () => ({
    section: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      maxWidth: 500,
      margin: "0 auto",
    },
  }),
  { name: "ForgotPassword" },
);
