import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";

export default makeStyles<Theme>(
  theme => ({
    label: {
      width: "100%",
      marginLeft: 0,
      marginRight: 0,
    },
    slider: {
      marginLeft: theme.spacing(2),
    },
  }),
  { name: "Slider" },
);
