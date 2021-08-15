import { createStyles, makeStyles } from "@material-ui/core";

export default makeStyles(
  () =>
    createStyles({
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
