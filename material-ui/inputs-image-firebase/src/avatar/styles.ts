import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles<Theme>(
  () => ({
    root: {
      height: 200 + 12,
      width: 200,
      position: "relative",
    },
    label: {
      position: "relative",
    },
    button: {
      position: "absolute",
      top: 0,
      right: 0,
    },
    image: {
      height: 200 + 12,
      width: 200,
      borderRadius: "50%",
      borderColor: "#fff",
      borderStyle: "solid",
      borderWidth: 0,
      overflow: "hidden",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    },
    input: {
      height: 200,
      width: 200,
      opacity: 0.4,
    },
  }),
  { name: "AvatarInput" },
);
