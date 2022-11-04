import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles<Theme>(
  theme => ({
    root: {
      marginTop: theme.spacing(2),
    },
    container: {
      marginTop: theme.spacing(1),
    },
    media: {
      width: 200,
      height: 150,
    },
  }),
  { name: "GalleryInput" },
);
