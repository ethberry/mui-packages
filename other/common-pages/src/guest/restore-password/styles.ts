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
