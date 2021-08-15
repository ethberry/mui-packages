import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";

export default makeStyles<Theme>(
  () => ({
    popup: {
      width: 400,
      margin: "auto",
    },
    section: {
      alignItems: "center",
      maxWidth: 500,
      margin: "0 auto",
    },
  }),
  { name: "Resend" },
);
