import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles<Theme>(
  theme => ({
    header: {
      marginBottom: theme.spacing(3),
      marginTop: theme.spacing(2),
    },
    wrapper: {
      marginRight: theme.spacing(2),
    },
    title: {
      ...theme.typography.h4,
      lineHeight: "52px", // buttons height
    },
    buttons: {
      display: "flex",
      flexGrow: 1,
    },
  }),
  { name: "PageHeader" },
);
