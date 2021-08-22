import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles<Theme>(
  theme => ({
    container: {
      marginTop: theme.spacing(1),
    },
    media: {
      width: 200,
      height: 150,
    },
    progress: {
      width: 200,
      height: 150,
      border: "#D7D7D7 3px dashed",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  }),
  { name: "ImageGallery" },
);
