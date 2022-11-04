import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles<Theme>(
  {
    media: {
      width: 200,
      height: 150,
    },
  },
  { name: "GalleryInput" },
);
