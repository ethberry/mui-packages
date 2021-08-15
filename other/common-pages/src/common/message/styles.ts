import { createStyles, makeStyles } from "@material-ui/core";

export default makeStyles(
  () =>
    createStyles({
      text: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        margin: "0 auto",
        marginTop: "-120px",
      },
    }),
  { name: "NotFound" },
);
