import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles<Theme>(
  () => ({
    root: {
      overflow: "auto",
    },
  }),
  { name: "StaticInput" },
);