import { createStyles, makeStyles } from "@material-ui/core";

export default makeStyles(
  () =>
    createStyles({
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
