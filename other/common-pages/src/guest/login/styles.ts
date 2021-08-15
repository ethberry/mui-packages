import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";

export default makeStyles<Theme>(
  () => ({
    section: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "calc(100vh - 64px)",
      maxWidth: 500,
      margin: "0 auto",
    },
  }),
  { name: "Login" },
);
